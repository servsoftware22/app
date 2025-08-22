import { createServerClient } from "@/lib/supabase";
import UrbanContactPage from "../../../Urban/(marketing)/contact/page";

// This is a server component that fetches data and renders the template server-side
export default async function ContactPage({ params }) {
  const { domain } = await params;
  const supabase = createServerClient();

  // Fetch website data directly in this page
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
  return <UrbanContactPage websiteData={website} />;
}
