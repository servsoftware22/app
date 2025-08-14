import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname, host } = request.nextUrl;

  // Log all request details for debugging
  console.log("=== MIDDLEWARE DEBUG ===");
  console.log("Request URL:", request.url);
  console.log("Host header:", request.headers.get("host"));
  console.log("NextURL host:", host);
  console.log("Pathname:", pathname);
  console.log("All headers:", Object.fromEntries(request.headers.entries()));
  console.log("========================");

  // Check if this is a subdomain request
  if (host.includes(".toolpage.site") && !host.startsWith("www.")) {
    const subdomain = host.split(".")[0];

    // Skip if it's the main domain
    if (subdomain === "toolpage") {
      console.log("Main domain detected, skipping");
      return NextResponse.next();
    }

    // If it's a subdomain and not already a website route, rewrite to the website route
    if (!pathname.startsWith("/website/")) {
      const url = request.nextUrl.clone();
      url.pathname = `/website/${subdomain}${pathname === "/" ? "" : pathname}`;

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
