import UrbanSignupPage from "../../../Urban/(auth)/signup/page";
import { createServerClient } from "@/lib/supabase";

export default async function SignupPage({ params }) {
  const { domain } = await params;

  const supabase = createServerClient();
  const { data: website, error } = await supabase
    .from("websites")
    .select("*, template, business_info")
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

  // Render template-specific signup page
  const template = website.template || "Urban";

  if (template === "Urban") {
    return <UrbanSignupPage websiteData={website} />;
  }

  // TODO: Add other templates when they're implemented
  // if (template === "Industrial") {
  //   return <IndustrialSignupPage websiteData={website} />;
  // }
  // if (template === "Luxury") {
  //   return <LuxurySignupPage websiteData={website} />;
  // }

  // Fallback to Urban template
  return <UrbanSignupPage websiteData={website} />;
}
