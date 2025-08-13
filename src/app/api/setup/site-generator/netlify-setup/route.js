import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(request) {
  try {
    const supabase = createServerClient(request);

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { websiteId, subdomain } = await request.json();

    if (!websiteId || !subdomain) {
      return NextResponse.json(
        { error: "Website ID and subdomain are required" },
        { status: 400 }
      );
    }

    // Verify the website belongs to the current user
    const { data: website, error: websiteError } = await supabase
      .from("websites")
      .select("id, owner, domain")
      .eq("id", websiteId)
      .eq("owner", user.id)
      .single();

    if (websiteError || !website) {
      return NextResponse.json(
        { error: "Website not found or access denied" },
        { status: 404 }
      );
    }

    // Get Netlify configuration from environment variables
    const netlifyToken = process.env.NETLIFY_ACCESS_TOKEN;
    const netlifySiteId = process.env.NETLIFY_SITE_ID;

    if (!netlifyToken || !netlifySiteId) {
      console.error("Missing Netlify configuration");
      return NextResponse.json(
        { error: "Netlify configuration not available" },
        { status: 500 }
      );
    }

    try {
      // Step 1: Create a new site in Netlify for the subdomain
      const createSiteResponse = await fetch(
        `https://api.netlify.com/api/v1/sites`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${netlifyToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: subdomain,
            custom_domain: `${subdomain}.toolpage.site`,
            force_ssl: true,
            ssl: true,
            processing_settings: {
              skip: false,
              css: { bundle: true, minify: true },
              js: { bundle: true, minify: true },
              html: { pretty_urls: true },
              images: { compress: true },
              fonts: { compress: true },
            },
            build_settings: {
              cmd: "npm run build",
              dir: "dist",
              functions_dir: "netlify/functions",
              publish_dir: "dist",
            },
            deploy_settings: {
              auto_publish: true,
              branch_deploy: false,
              wait_for_ci: false,
            },
          }),
        }
      );

      if (!createSiteResponse.ok) {
        const errorData = await createSiteResponse.json();
        console.error("Netlify site creation failed:", errorData);
        throw new Error(
          `Failed to create Netlify site: ${
            errorData.message || "Unknown error"
          }`
        );
      }

      const netlifySite = await createSiteResponse.json();
      console.log("Netlify site created:", netlifySite);

      // Step 2: Set up DNS for the subdomain
      const dnsResponse = await fetch(
        `https://api.netlify.com/api/v1/sites/${netlifySite.id}/dns_records`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${netlifyToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hostname: subdomain,
            type: "CNAME",
            value: `${netlifySite.name}.netlify.app`,
            ttl: 3600,
          }),
        }
      );

      if (!dnsResponse.ok) {
        const dnsError = await dnsResponse.json();
        console.error("DNS setup failed:", dnsError);
        // Don't fail the entire process if DNS setup fails - it can be retried
      }

      // Step 3: Update the website record with Netlify information
      const { error: updateError } = await supabase
        .from("websites")
        .update({
          domain: {
            ...website.domain,
            netlify_site_id: netlifySite.id,
            netlify_url: netlifySite.url,
            netlify_admin_url: netlifySite.admin_url,
            dns: {
              ...website.domain.dns,
              netlify_dns_configured: true,
              last_dns_update: new Date().toISOString(),
            },
            status: {
              ...website.domain.status,
              netlify_deployed: true,
              last_deployment: new Date().toISOString(),
            },
          },
          updated_at: new Date().toISOString(),
        })
        .eq("id", websiteId);

      if (updateError) {
        console.error(
          "Failed to update website with Netlify info:",
          updateError
        );
        // Don't fail the entire process if database update fails
      }

      // Step 4: Trigger initial deployment
      const deployResponse = await fetch(
        `https://api.netlify.com/api/v1/sites/${netlifySite.id}/deploys`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${netlifyToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clear_cache: "full",
            draft: false,
          }),
        }
      );

      if (deployResponse.ok) {
        const deployData = await deployResponse.json();
        console.log("Initial deployment triggered:", deployData);
      }

      return NextResponse.json({
        success: true,
        message: "Netlify subdomain setup completed successfully",
        netlify_site: {
          id: netlifySite.id,
          url: netlifySite.url,
          admin_url: netlifySite.admin_url,
          custom_domain: `${subdomain}.toolpage.site`,
        },
        website_id: websiteId,
      });
    } catch (netlifyError) {
      console.error("Netlify setup error:", netlifyError);

      // Update website status to indicate failure
      await supabase
        .from("websites")
        .update({
          domain: {
            ...website.domain,
            status: {
              ...website.domain.status,
              netlify_deployed: false,
              last_error: netlifyError.message,
              last_error_time: new Date().toISOString(),
            },
          },
          updated_at: new Date().toISOString(),
        })
        .eq("id", websiteId);

      return NextResponse.json(
        {
          error: "Failed to setup Netlify subdomain",
          details: netlifyError.message,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Netlify setup route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET method to check the status of a Netlify deployment
export async function GET(request) {
  try {
    const supabase = createServerClient(request);
    const { searchParams } = new URL(request.url);
    const websiteId = searchParams.get("websiteId");

    if (!websiteId) {
      return NextResponse.json(
        { error: "Website ID is required" },
        { status: 400 }
      );
    }

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get website and verify ownership
    const { data: website, error: websiteError } = await supabase
      .from("websites")
      .select("id, owner, domain")
      .eq("id", websiteId)
      .eq("owner", user.id)
      .single();

    if (websiteError || !website) {
      return NextResponse.json(
        { error: "Website not found or access denied" },
        { status: 404 }
      );
    }

    const netlifySiteId = website.domain?.netlify_site_id;
    if (!netlifySiteId) {
      return NextResponse.json({
        status: "not_configured",
        message: "Netlify not yet configured for this website",
      });
    }

    // Check Netlify deployment status
    const netlifyToken = process.env.NETLIFY_ACCESS_TOKEN;
    if (!netlifyToken) {
      return NextResponse.json({
        status: "error",
        message: "Netlify configuration not available",
      });
    }

    try {
      const statusResponse = await fetch(
        `https://api.netlify.com/api/v1/sites/${netlifySiteId}`,
        {
          headers: {
            Authorization: `Bearer ${netlifyToken}`,
          },
        }
      );

      if (statusResponse.ok) {
        const siteData = await statusResponse.json();
        return NextResponse.json({
          status: "active",
          netlify_site: {
            id: siteData.id,
            url: siteData.url,
            admin_url: siteData.admin_url,
            custom_domain: siteData.custom_domain,
            ssl_url: siteData.ssl_url,
            force_ssl: siteData.force_ssl,
            created_at: siteData.created_at,
            updated_at: siteData.updated_at,
          },
        });
      } else {
        return NextResponse.json({
          status: "error",
          message: "Failed to fetch Netlify site status",
        });
      }
    } catch (netlifyError) {
      return NextResponse.json({
        status: "error",
        message: "Error checking Netlify status",
        details: netlifyError.message,
      });
    }
  } catch (error) {
    console.error("Netlify status check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
