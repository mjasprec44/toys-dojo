import { ROUTES } from "@/app/constants/route";

// src/config/route-access.ts
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.MARKET_PLACE,
  ROUTES.SIGN_IN,
  ROUTES.SIGN_UP,
  ROUTES.CART, // Cart is often accessible to guests
] as const;

export const AUTH_ROUTES = [ROUTES.SIGN_IN, ROUTES.SIGN_UP];

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.ADMIN,
  ROUTES.ACCOUNT,
  ROUTES.CHECKOUT, // Checkout should require login
  ROUTES.MY_COLLECTION,
] as const;

// Helper to check if a path matches any route in a list (supports sub-paths)
export const matchesRoute = (
  pathname: string,
  routes: readonly string[],
): boolean =>
  routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

// Optional: Helper to create a regex-based matcher -- to use when app gets bigger and there is a lot more Routes
export const createRouteMatcher = (routes: readonly string[]) => {
  const pattern = routes
    .map((route) => route.replace(/\/$/, "").replace(/\./g, "\\."))
    .join("|");
  const regex = new RegExp(`^(${pattern})(/.*)?$`);
  return (pathname: string) => regex.test(pathname);
};
