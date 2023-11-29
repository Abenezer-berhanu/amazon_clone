import { NextResponse, NextRequest } from "next/server";
import { getTokenInfo } from "./utils/getTokenInfo";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("ab_am_us_er")?.value || "";


  const isPublicUser = path === "/auth/signin" || path === "/auth/signup";

  const isNotPublicPath = path === "/(.*)";

  if (isNotPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (isPublicUser && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicUser && !token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}
export const config = {
  matcher: [
    "/auth/:path*",
    "/cart/:path*",
    "/product/:path*",
    "/me/:path*",
    "/user/:path*",
  ],
};

