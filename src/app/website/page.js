"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WebsiteIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main marketing site since this is just the website folder
    router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
