import UrbanServicePage from "../../../../Urban/(marketing)/service/page";
import { createServerClient } from "@/lib/supabase";

export default async function ServicePage({ params }) {
  const { domain, slug } = await params;

  // Fetch website data directly in this page
  const supabase = createServerClient();
  const { data: website, error } = await supabase
    .from("websites")
    .select("*, template, home, services")
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

  // Pass website data and resolved params to the template component
  return <UrbanServicePage websiteData={website} params={{ domain, slug }} />;
}
