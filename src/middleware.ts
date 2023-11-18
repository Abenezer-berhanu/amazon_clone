import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

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
    "/",
    "/auth/:path*",
    "/cart/:path*",
    "/product/:path*",
    "/me/:path*",
  ],
};

// if (path === "/" && !token) {
//     return NextResponse.redirect(new URL("/auth/signin", request.url));
//   } else if (path === "/auth/signin" && token) {
//     return NextResponse.redirect(new URL("/", request.url));
//   } else if (path === "/auth/signup" && token) {
//     return NextResponse.redirect(new URL("/", request.url));
//   } else if (path === "/product/:path") {
//     console.log(
//       "dinamic pageadsljl;ajldjlldjasjdlj sdka;jfdjsajfjaldsjkfljadlksjf;ljdskfj;ladsj;lfj;ldsfj;ljdslfldjfjdslueijiugenjvj.oncvioaneoffnvoakepovadfnsa"
//     );
//   }
