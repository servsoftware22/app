import { createServerClient } from "@/lib/supabase";
import UrbanAboutPage from "../../../Urban/(marketing)/about/page";

// This is a server component that fetches data and renders the template server-side
export default async function AboutPage({ params }) {
  const { domain } = await params;

  // Fetch website data server-side in the page component
  const supabase = createServerClient();
  const { data: website, error } = await supabase
    .from("websites")
    .select("*, template, home, about")
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

  // Pass data directly to UrbanAboutPage for server-side rendering
  return <UrbanAboutPage websiteData={website} />;
}
