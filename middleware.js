import { NextResponse } from "next/server";
import { redirectsMap } from "./utils/redirects";

const LOGIN_PAGE = "/dashboard/admin/login";
const TEACHER_LOGIN_PAGE = "/dashboard/teacher/login";
const TEACHER_HOME = "/dashboard/teacher";
const EXCLUDED_PATHS = [
  "/dashboard/admin/login",
  "/dashboard/subadmin/login",
  "/dashboard/teacher/login",
];

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
    const teacherToken = request.cookies.get("teacher_token");

    // The teacher portal is its own area: only a teacher session opens it,
    // and a teacher session opens nothing else.
    if (pathname.startsWith(TEACHER_HOME)) {
      if (!teacherToken) {
        return NextResponse.redirect(new URL(TEACHER_LOGIN_PAGE, request.url));
      }
    } else if (!adminToken && !subAdminToken) {
      if (teacherToken) {
        return NextResponse.redirect(new URL(TEACHER_HOME, request.url));
      }
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
