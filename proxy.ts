import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./lib/auth/auth";
import { ROUTES } from "./app/constants/route";

// 1. Define route groups clearly
const AUTH_ROUTES = [ROUTES.SIGN_IN, ROUTES.SIGN_UP];
const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.ADMIN,
  ROUTES.ACCOUNT,
  ROUTES.CHECKOUT,
  ROUTES.MY_COLLECTION,
];

// 2. Helper to check if a path matches any route in a list (supports sub-paths)
const matchesRoute = (pathname: string, routes: readonly string[]): boolean =>
  routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSession();
  const isLoggedIn = !!session?.user;

  // 3. Handle Auth Routes (Login/Signup)
  // Redirect logged-in users away from auth pages
  if (matchesRoute(pathname, AUTH_ROUTES) && isLoggedIn) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  // 4. Handle Protected Routes
  // Redirect unauthenticated users to sign-in, preserving their intended destination
  if (matchesRoute(pathname, PROTECTED_ROUTES) && !isLoggedIn) {
    const signInUrl = new URL(ROUTES.SIGN_IN, request.url);
    signInUrl.searchParams.set("callbackUrl", pathname); // Important for UX
    return NextResponse.redirect(signInUrl);
  }

  // 5. Admin Route Role Check (Example)
  // If you need role-based access, you can add it here
  if (pathname.startsWith(ROUTES.ADMIN) && isLoggedIn) {
    // Assuming your session has a role property
    // if (session.user.role !== 'admin') {
    //   return NextResponse.redirect(new URL('/unauthorized', request.url));
    // }
  }

  // 6. Allow the request to proceed
  return NextResponse.next();
}

// 7. Optimized Matcher (excludes static assets and API routes)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
