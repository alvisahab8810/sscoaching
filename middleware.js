import { NextResponse } from "next/server";
import { redirectsMap } from "./utils/redirects";

const LOGIN_PAGE = "/dashboard/admin/login";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Protect all /dashboard/* routes except the login page itself
  if (pathname.startsWith("/dashboard") && !pathname.startsWith(LOGIN_PAGE)) {
    const token = request.cookies.get("admin_token");
    if (!token) {
      return NextResponse.redirect(new URL(LOGIN_PAGE, request.url));
    }
  }

  const cleanPath =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;

  const redirectPath = redirectsMap[cleanPath];

  if (redirectPath) {
    return NextResponse.redirect(
      new URL(redirectPath, request.url),
      301
    );
  }

  return NextResponse.next();
}