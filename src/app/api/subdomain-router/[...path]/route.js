import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET(request, { params }) {
  const { path } = params;
  const host =
    request.headers.get("x-forwarded-host") || request.headers.get("host");

  console.log("=== SUBDOMAIN ROUTER API ===");
  console.log("Host:", host);
  console.log("Path:", path);
  console.log("All headers:", Object.fromEntries(request.headers.entries()));
  console.log("============================");

  // Check if this is a subdomain request
  if (host && host.includes(".toolpage.site") && !host.startsWith("www.")) {
    const subdomain = host.split(".")[0];

    if (subdomain === "toolpage") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // This is a subdomain - redirect to the website route
    const websiteUrl = new URL(
      `/website/${subdomain}${path ? `/${path.join("/")}` : ""}`,
      request.url
    );
    console.log("Redirecting subdomain to:", websiteUrl.toString());

    return NextResponse.redirect(websiteUrl);
  }

  // Not a subdomain request
  return NextResponse.json(
    { error: "Not a subdomain request" },
    { status: 400 }
  );
}

export async function POST(request, { params }) {
  return GET(request, { params });
}
