import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req: NextRequest) => {
  const isLoggedIn = !!(req as any).auth;
  const { pathname, origin } = req.nextUrl;

  const isPublicPage = pathname === "/";
  const isHomePage = pathname.startsWith("/home");
  const isAuthRoute = pathname.startsWith("/auth");

  // Redirect authenticated users trying to access public pages
  if (isLoggedIn && isPublicPage) {
    return NextResponse.redirect(new URL("/home", origin));
  }

  // Redirect unauthorized users trying to access private routes
  if (!isLoggedIn && isHomePage) {
    const url = new URL("/", origin);
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/home", origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
