"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import WebsiteGenerator from "../components/WebsiteGenerator";
import LoadingSpinner from "../components/LoadingSpinner";

export default function DynamicWebsite({ params }) {
  const [websiteData, setWebsiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { domain } = params;

  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        setLoading(true);

        // Fetch website data from Supabase
        const { data, error } = await supabase
          .from("websites")
          .select("*")
          .eq("domains->>subdomain", domain)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          setError("Website not found");
          return;
        }

        setWebsiteData(data);
      } catch (err) {
        console.error("Error fetching website data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (domain) {
      fetchWebsiteData();
    }
  }, [domain]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Website Not Found
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Domain: {domain}</p>
        </div>
      </div>
    );
  }

  if (!websiteData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Website Not Found
          </h1>
          <p className="text-gray-600">
            The requested website could not be found.
          </p>
        </div>
      </div>
    );
  }

  return <WebsiteGenerator websiteData={websiteData} />;
}
