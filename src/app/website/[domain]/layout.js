import { createServerClient } from "@/lib/supabase";

export async function generateMetadata({ params }) {
  const { domain } = await params;

  // Fetch website data for this subdomain
  const supabase = createServerClient();
  const { data: website, error } = await supabase
    .from("websites")
    .select("domain, palette, business_info")
    .eq("domain->>subdomain", domain)
    .single();

  if (error || !website) {
    return {
      title: "Website Not Found",
      description: "The requested website could not be found.",
    };
  }

  return {
    title: website.business_info?.name || domain,
    description:
      website.business_info?.description ||
      `Welcome to ${website.business_info?.name || domain}`,
  };
}

export default async function WebsiteLayout({ children, params }) {
  const { domain } = await params;

  // Fetch full website data for all pages
  const supabase = createServerClient();
  const { data: website, error } = await supabase
    .from("websites")
    .select("*, template, home")
    .eq("domain->>subdomain", domain)
    .single();

  if (error || !website) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Website Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            No website found for subdomain: {domain}
          </p>
        </div>
      </div>
    );
  }

  // Pass website data to all children via data attribute
  return <div data-website={JSON.stringify(website)}>{children}</div>;
}
