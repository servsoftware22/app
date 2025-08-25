import React from "react";
import { createServerClient } from "@/lib/supabase";

export async function generateMetadata({ params }) {
  const { domain } = await params;

  try {
    // Fetch website data for this subdomain
    const supabase = createServerClient();

    if (!supabase) {
      return {
        title: "Loading...",
        description: "Please wait while we load the website.",
      };
    }

    const { data: website, error } = await supabase
      .from("websites")
      .select("domain, palette, business_info")
      .eq("domain->>subdomain", domain)
      .single();

    if (error || !website) {
      console.error("Error fetching website metadata:", error);
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
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "Error Loading Website",
      description: "There was an error loading the website.",
    };
  }
}

export default async function WebsiteLayout({ children, params }) {
  const { domain } = await params;

  try {
    // Fetch full website data for all pages
    const supabase = createServerClient();

    if (!supabase) {
      console.warn("Supabase client not available during build time");
      // Return a fallback layout during build time
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Loading...
            </h1>
            <p className="text-gray-600 mb-4">
              Please wait while we load the website.
            </p>
          </div>
        </div>
      );
    }

    const { data: website, error } = await supabase
      .from("websites")
      .select("*, template, home")
      .eq("domain->>subdomain", domain)
      .single();

    if (error || !website) {
      console.error("Error fetching website data:", error);
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

    // Pass website data to all children directly
    return (
      <>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { websiteData: website });
          }
          return child;
        })}
      </>
    );
  } catch (error) {
    console.error("Layout error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Website
          </h1>
          <p className="text-gray-600 mb-4">
            There was an error loading the website. Please try again.
          </p>
        </div>
      </div>
    );
  }
}
