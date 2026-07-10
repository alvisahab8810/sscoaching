import { NextResponse } from "next/server";
import { redirectsMap } from "./utils/redirects";

const LOGIN_PAGE = "/dashboard/admin/login";
const EXCLUDED_PATHS = ["/dashboard/admin/login", "/dashboard/subadmin/login"];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Source",
  "Access-Control-Max-Age": "86400",
};

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Handle CORS preflight for API routes
  if (request.method === "OPTIONS" && pathname.startsWith("/api/")) {
    return new NextResponse(null, { status: 200, headers: CORS_HEADERS });
  }

  // Protect all /dashboard/* routes except login pages
  if (pathname.startsWith("/dashboard") && !EXCLUDED_PATHS.some(p => pathname.startsWith(p))) {
    const adminToken = request.cookies.get("admin_token");
    const subAdminToken = request.cookies.get("subadmin_token");
    if (!adminToken && !subAdminToken) {
      return NextResponse.redirect(new URL(LOGIN_PAGE, request.url));
    }
  }

  const cleanPath =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;

  const redirectPath = redirectsMap[cleanPath];
  if (redirectPath) {
    return NextResponse.redirect(new URL(redirectPath, request.url), 301);
  }

  // Add CORS headers to all API responses
  const response = NextResponse.next();
  if (pathname.startsWith("/api/")) {
    Object.entries(CORS_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }

  return response;
}
