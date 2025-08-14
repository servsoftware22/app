import { NextResponse } from "next/server";

export async function GET(request) {
  const { host, url } = request.nextUrl;

  // Log everything we can about this request
  console.log("=== TEST SUBDOMAIN ENDPOINT DEBUG ===");
  console.log("Request URL:", request.url);
  console.log("NextURL host:", host);
  console.log("Host header:", request.headers.get("host"));
  console.log("X-Forwarded-Host:", request.headers.get("x-forwarded-host"));
  console.log("X-Forwarded-For:", request.headers.get("x-forwarded-for"));
  console.log("User-Agent:", request.headers.get("user-agent"));
  console.log("All headers:", Object.fromEntries(request.headers.entries()));
  console.log("=====================================");

  return NextResponse.json({
    success: true,
    message: "Subdomain test endpoint working",
    host: host,
    url: url.toString(),
    timestamp: new Date().toISOString(),
    headers: Object.fromEntries(request.headers.entries()),
    debug: {
      nextUrlHost: host,
      hostHeader: request.headers.get("host"),
      xForwardedHost: request.headers.get("x-forwarded-host"),
      xForwardedFor: request.headers.get("x-forwarded-for"),
    },
  });
}
