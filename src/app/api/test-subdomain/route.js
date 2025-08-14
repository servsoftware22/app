import { NextResponse } from "next/server";

export async function GET(request) {
  const { host, url } = request.nextUrl;

  console.log("Test subdomain endpoint hit:", { host, url: url.toString() });

  return NextResponse.json({
    success: true,
    message: "Subdomain test endpoint working",
    host: host,
    url: url.toString(),
    timestamp: new Date().toISOString(),
    headers: Object.fromEntries(request.headers.entries()),
  });
}
