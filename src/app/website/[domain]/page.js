import { createServerClient } from "@/lib/supabase";
import WebsiteGenerator from "../components/WebsiteGenerator";
import LoadingSpinner from "../components/LoadingSpinner";

export async function generateMetadata({ params }) {
  const { domain } = params;

  // Fetch website data for this subdomain
  const supabase = createServerClient();
  const { data: website, error } = await supabase
    .from("websites")
    .select("domain, palette, business")
    .eq("domain->>subdomain", domain)
    .single();

  if (error || !website) {
    return {
      title: "Website Not Found",
      description: "The requested website could not be found.",
    };
  }

  return {
    title:
      website.domain?.seo?.meta_title || `${domain} - Professional Services`,
    description:
      website.domain?.seo?.meta_description || "Professional services website",
    openGraph: {
      title:
        website.domain?.seo?.meta_title || `${domain} - Professional Services`,
      description:
        website.domain?.seo?.meta_description ||
        "Professional services website",
      url: `https://${domain}.toolpage.site`,
      siteName: domain,
    },
  };
}

export default async function DynamicWebsite({ params }) {
  const { domain } = params;

  console.log("DynamicWebsite component called with domain:", domain);

  try {
    // Fetch website data from Supabase using the new domain structure
    const supabase = createServerClient();
    const { data: website, error } = await supabase
      .from("websites")
      .select(
        `
        *,
        business:business(*)
      `
      )
      .eq("domain->>subdomain", domain)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    if (!website) {
      console.log("No website found for subdomain:", domain);
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Website Not Found
            </h1>
            <p className="text-gray-600 mb-4">
              No website found for subdomain: {domain}
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <p className="text-sm text-gray-500 mb-2">Debug Info:</p>
              <p className="text-xs text-gray-400">Subdomain: {domain}</p>
              <p className="text-xs text-gray-400">
                Time: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      );
    }

    console.log("Website data found:", {
      id: website.id,
      subdomain: website.domain?.subdomain,
      business_name: website.business?.name,
      template: website.palette?.template,
    });

    return <WebsiteGenerator websiteData={website} />;
  } catch (error) {
    console.error("Error in DynamicWebsite:", error);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Website
          </h1>
          <p className="text-gray-600 mb-4">
            There was an error loading the website for subdomain: {domain}
          </p>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500 mb-2">Debug Info:</p>
            <p className="text-xs text-gray-400">Subdomain: {domain}</p>
            <p className="text-xs text-gray-400">Error: {error.message}</p>
            <p className="text-xs text-gray-400">
              Time: {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
