import UrbanPage from "../../Urban/page";
import { createServerClient } from "@/lib/supabase";

export default async function HomePage({ params }) {
  const { domain } = await params;

  // Fetch website data server-side for this page
  const supabase = createServerClient();
  const { data: website, error } = await supabase
    .from("websites")
    .select("*, template, home, services, faq, cta")
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

  // This will be server-side rendered, no loading states needed
  return <UrbanPage websiteData={website} />;
}
