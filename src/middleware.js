import { NextResponse } from "next/server";

export function middleware(request) {
  // Simple test to verify middleware is running
  console.log("🔧 MIDDLEWARE IS RUNNING for:", request.url);

  const { pathname, host } = request.nextUrl;

  // Get the original host from x-forwarded-host (preserved by Cloudflare)
  const originalHost = request.headers.get("x-forwarded-host") || host;

  // Log all request details for debugging
  console.log("=== MIDDLEWARE DEBUG ===");
  console.log("Request URL:", request.url);
  console.log("Host header:", request.headers.get("host"));
  console.log("X-Forwarded-Host:", request.headers.get("x-forwarded-host"));
  console.log("Original Host (detected):", originalHost);
  console.log("NextURL host:", host);
  console.log("Pathname:", pathname);
  console.log("========================");

  // Check if this is a subdomain request using the original host
  if (
    originalHost.includes(".toolpage.site") &&
    !originalHost.startsWith("www.")
  ) {
    const subdomain = originalHost.split(".")[0];

    // Skip if it's the main domain
    if (subdomain === "toolpage") {
      console.log("Main domain detected, skipping");
      return NextResponse.next();
    }

    // If it's a subdomain and not already a website route, rewrite to the website route
    if (!pathname.startsWith("/website/")) {
      const url = request.nextUrl.clone();

      // For the home page, go to /website/[domain]
      // For other pages, go to /website/[domain]/(marketing)/[page]
      if (pathname === "/") {
        url.pathname = `/website/${subdomain}`;
      } else {
        url.pathname = `/website/${subdomain}/(marketing)${pathname}`;
      }

      console.log(
        `Subdomain ${subdomain} detected, rewriting to: ${url.pathname}`
      );

      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
