import { createServerClient } from "@/lib/supabase";
import UrbanQuotePage from "../../../Urban/(app)/quote/page";

export default async function QuotePage({ params }) {
  const { domain } = await params;

  // Create Supabase client
  const supabase = createServerClient();

  // Fetch website data
  const { data: websiteData, error } = await supabase
    .from("websites")
    .select("*, template, business_info, business")
    .eq("domain->>subdomain", domain)
    .single();

  if (error || !websiteData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Website Not Found
          </h1>
          <p className="text-gray-600">
            No website found for subdomain: {domain}
          </p>
        </div>
      </div>
    );
  }

  return <UrbanQuotePage websiteData={websiteData} />;
}
