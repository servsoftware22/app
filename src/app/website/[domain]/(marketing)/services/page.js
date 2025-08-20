import UrbanServicesPage from "../../../Urban/(marketing)/services/page";
import { createServerClient } from "@/lib/supabase";

export default async function ServicesPage({ params }) {
  const { domain } = await params;

  // Fetch website data directly in this page
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

  // Pass website data directly to the template component
  return <UrbanServicesPage websiteData={website} />;
}
