import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

// Helper function to generate a clean domain from business name
function generateDomainFromBusinessName(businessName) {
  if (!businessName) return null;

  // Clean the business name: remove special characters, convert to lowercase, replace spaces with hyphens
  let cleanName = businessName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim();

  // Remove leading/trailing hyphens
  cleanName = cleanName.replace(/^-+|-+$/g, "");

  // Ensure the name isn't too long (max 30 characters for domain part)
  if (cleanName.length > 30) {
    cleanName = cleanName.substring(0, 30);
    // Remove trailing hyphen if it exists
    cleanName = cleanName.replace(/-+$/, "");
  }

  return cleanName;
}

// Helper function to check domain uniqueness
async function findUniqueDomain(supabase, baseDomain, maxAttempts = 10) {
  let attempt = 0;
  let domain = baseDomain;

  while (attempt < maxAttempts) {
    // Check if this domain already exists
    const { data: existingWebsite, error: checkError } = await supabase
      .from("websites")
      .select("id")
      .eq("domain->>subdomain", domain)
      .single();

    if (checkError && checkError.code === "PGRST116") {
      // No rows returned, domain is available
      return domain;
    }

    if (checkError) {
      console.error("Error checking domain uniqueness:", checkError);
      return null;
    }

    // Domain exists, try with a number suffix
    attempt++;
    domain = `${baseDomain}-${attempt}`;
  }

  // If we've exhausted all attempts, generate a random suffix
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  return `${baseDomain}-${randomSuffix}`;
}

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

    const {
      businessType,
      selectedDefaultServiceIds,
      selectedTemplate,
      primaryColor,
      secondaryColor,
      accentColor,
      neutralColor,
      businessName,
    } = await request.json();

    if (!businessType) {
      return NextResponse.json(
        { error: "Business type is required" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!selectedTemplate) {
      return NextResponse.json(
        { error: "Template selection is required" },
        { status: 400 }
      );
    }

    if (!primaryColor || !secondaryColor || !accentColor || !neutralColor) {
      return NextResponse.json(
        { error: "All brand colors are required" },
        { status: 400 }
      );
    }

    if (!businessName) {
      return NextResponse.json(
        { error: "Business name is required for domain generation" },
        { status: 400 }
      );
    }

    console.log("Generating website for business type:", businessType);
    console.log("Business name:", businessName);
    console.log("Selected services:", selectedDefaultServiceIds);
    console.log("Template:", selectedTemplate);
    console.log("Colors:", {
      primaryColor,
      secondaryColor,
      accentColor,
      neutralColor,
    });

    // Get business type data from the business_types table
    const { data: businessTypeData, error: businessTypeError } = await supabase
      .from("business_types")
      .select("*")
      .eq("name", businessType)
      .single();

    if (businessTypeError || !businessTypeData) {
      console.error("Error fetching business type:", businessTypeError);
      return NextResponse.json(
        { error: "Business type not found" },
        { status: 404 }
      );
    }

    console.log("Found business type data:", businessTypeData);

    // Generate unique domain
    console.log("Generating unique domain for business:", businessName);
    const baseDomain = generateDomainFromBusinessName(businessName);
    if (!baseDomain) {
      return NextResponse.json(
        { error: "Failed to generate domain from business name" },
        { status: 400 }
      );
    }

    const uniqueDomain = await findUniqueDomain(supabase, baseDomain);
    if (!uniqueDomain) {
      return NextResponse.json(
        { error: "Failed to generate unique domain" },
        { status: 500 }
      );
    }

    console.log("Generated unique domain:", uniqueDomain);

    // Create comprehensive domain configuration
    const domainConfig = {
      // Domain information
      subdomain: uniqueDomain,
      full_domain: `${uniqueDomain}.toolpage.site`,
      custom_domain: null,
      primary_domain: `${uniqueDomain}.toolpage.site`,

      // Domain settings
      settings: {
        ssl_enabled: true,
        redirect_www: true,
        force_https: true,
        custom_404: false,
        maintenance_mode: false,
        password_protected: false,
        password: null,
        robots_txt: "User-agent: *\nAllow: /",
        sitemap_enabled: true,
        analytics_enabled: true,
        seo_optimized: true,
      },

      // DNS and technical settings
      dns: {
        nameservers: [
          "dns1.registrar-servers.com",
          "dns2.registrar-servers.com",
        ],
        a_record: null,
        cname_record: null,
        mx_records: [],
        txt_records: [],
        verification_status: "verified",
        last_verified: new Date().toISOString(),
      },

      // Domain status and management
      status: {
        active: true,
        verified: true,
        suspended: false,
        expiration_date: null,
        auto_renew: true,
        last_health_check: new Date().toISOString(),
        health_status: "healthy",
      },

      // SEO and performance
      seo: {
        canonical_url: `https://${uniqueDomain}.toolpage.site`,
        meta_title: `${businessName} - Professional Services`,
        meta_description: `Professional ${businessType} services by ${businessName}. Get quality work done right.`,
        og_image: null,
        twitter_card: "summary_large_image",
        structured_data: {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: businessName,
          description: `Professional ${businessType} services`,
          url: `https://${uniqueDomain}.toolpage.site`,
        },
      },

      // Analytics and tracking
      analytics: {
        google_analytics_id: null,
        google_tag_manager_id: null,
        facebook_pixel_id: null,
        conversion_tracking: false,
        heatmap_enabled: false,
        session_recording: false,
      },

      // Security settings
      security: {
        rate_limiting: true,
        ddos_protection: true,
        firewall_enabled: true,
        malware_scanning: true,
        backup_enabled: true,
        backup_frequency: "daily",
        last_backup: null,
      },

      // Performance and caching
      performance: {
        cdn_enabled: true,
        image_optimization: true,
        minification_enabled: true,
        gzip_compression: true,
        browser_caching: true,
        page_speed_optimization: true,
      },

      // Integration settings
      integrations: {
        google_search_console: false,
        bing_webmaster_tools: false,
        social_media_links: [],
        third_party_scripts: [],
        custom_css: null,
        custom_js: null,
      },

      // Timestamps
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_modified: new Date().toISOString(),
    };

    // Get the selected services data
    let selectedServices = [];
    if (selectedDefaultServiceIds && selectedDefaultServiceIds.length > 0) {
      console.log("Fetching services with IDs:", selectedDefaultServiceIds);

      // Get all business types to find the services in their default_services JSONB column
      const { data: allBusinessTypes, error: businessTypesError } =
        await supabase.from("business_types").select("default_services");

      if (businessTypesError) {
        console.error("Error fetching business types:", businessTypesError);
        return NextResponse.json(
          { error: "Failed to fetch business types" },
          { status: 500 }
        );
      }

      // Extract all services from all business types' default_services JSONB columns
      const allServices = [];
      allBusinessTypes.forEach((businessType) => {
        if (
          businessType.default_services &&
          Array.isArray(businessType.default_services)
        ) {
          allServices.push(...businessType.default_services);
        }
      });

      // Filter to only the selected services
      selectedServices = allServices.filter((service) =>
        selectedDefaultServiceIds.includes(service.id)
      );

      console.log(
        `Found ${selectedServices.length} selected services:`,
        selectedServices.map((s) => ({ id: s.id, name: s.name }))
      );
    } else {
      console.log("No services selected, using empty services array");
    }

    // Get the business record for this user
    const { data: businessData, error: businessError } = await supabase
      .from("business")
      .select("id")
      .eq("owner", user.id)
      .single();

    if (businessError || !businessData) {
      console.error("Error fetching business:", businessError);
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    console.log("Found business:", businessData);

    // Prepare website data
    const websiteData = {
      owner: user.id,
      admins: [user.id], // User is the primary admin
      business: businessData.id,

      // Add the domain configuration
      domain: domainConfig,

      // Content from business type
      home: businessTypeData.default_home || {},
      about: businessTypeData.default_about || {},
      faq: businessTypeData.default_faq || {},
      seo: businessTypeData.default_seo || {},

      // Services from user selection
      services: selectedServices,

      // Template and branding
      palette: {
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor,
        neutral: neutralColor,
        template: selectedTemplate,
      },

      // Initialize other sections as empty
      contact: {},
      cta: {},
      gallery: {},
      blog: {},
      portfolio: {},
      team: {},
      pricing: {},
      locations: {},
      offers: {},
      careers: {},
      landing: {},
      images: [],
      videos: [],
      terms_of_service: {},
      privacy_policy: {},
      policies: {},
      header: {},
      footer: {},
      banner: {},

      // Timestamps
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Validate website data structure
    console.log("Validating website data structure...");
    if (!websiteData.owner || !websiteData.business || !websiteData.domain) {
      console.error("Missing required fields:", {
        owner: !!websiteData.owner,
        business: !!websiteData.business,
        domain: !!websiteData.domain,
      });
      return NextResponse.json(
        { error: "Missing required website fields" },
        { status: 400 }
      );
    }

    // Ensure services array is properly formatted
    if (websiteData.services && Array.isArray(websiteData.services)) {
      websiteData.services = websiteData.services.map((service) => ({
        id: service.id,
        name: service.name,
        slug: service.slug,
        category: service.category,
        description: service.description || {},
        pricing: service.pricing || {},
        features: service.features || [],
        status: service.status || "active",
      }));
    }

    console.log("Website data to insert:", websiteData);
    console.log("Domain configuration:", domainConfig);

    // Check website table structure before insert
    console.log("Checking website table structure...");
    const { data: tableInfo, error: tableError } = await supabase
      .from("websites")
      .select("*")
      .limit(0);

    if (tableError) {
      console.error("Table structure error:", tableError);
      return NextResponse.json(
        { error: `Website table error: ${tableError.message}` },
        { status: 500 }
      );
    }

    console.log("Website table structure check passed");

    // Insert the website record
    const { data: website, error: websiteError } = await supabase
      .from("websites")
      .insert(websiteData)
      .select()
      .single();

    if (websiteError) {
      console.error("Error creating website:", websiteError);
      console.error("Error details:", {
        message: websiteError.message,
        code: websiteError.code,
        details: websiteError.details,
        hint: websiteError.hint,
      });
      return NextResponse.json(
        { error: `Failed to create website: ${websiteError.message}` },
        { status: 500 }
      );
    }

    console.log("Website created successfully:", website);
    console.log("Generated domain:", domainConfig.full_domain);

    // Update website status to indicate it's ready
    await supabase
      .from("websites")
      .update({
        domain: {
          ...website.domain,
          status: {
            ...website.domain.status,
            dns_configured: true,
            last_dns_update: new Date().toISOString(),
          },
        },
        updated_at: new Date().toISOString(),
      })
      .eq("id", website.id);

    console.log(
      "Website status updated - DNS is automatically configured via Namecheap wildcard"
    );

    return NextResponse.json({
      success: true,
      website: website,
      domain: domainConfig,
      message: "Website generated successfully",
      subdomain_url: `https://${uniqueDomain}.toolpage.site`,
      dns_status: "Automatically configured via Namecheap wildcard DNS",
      next_steps: [
        "Subdomain is automatically accessible via wildcard DNS",
        "Visit the subdomain to see your website",
        "Custom domains can be added later via Namecheap API",
      ],
    });
  } catch (error) {
    console.error("Website generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
