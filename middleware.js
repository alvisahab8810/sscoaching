import { NextResponse } from "next/server";
import { redirectsMap } from "./utils/redirects";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

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