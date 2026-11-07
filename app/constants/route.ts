// src/config/routes.ts
export const ROUTES = {
  HOME: "/",
  MARKET_PLACE: "/marketplace",
  DASHBOARD: "/dashboard",
  CART: "/cart",
  CHECKOUT: "/checkout",
  SIGN_UP: "/sign-up",
  SIGN_IN: "/sign-in",
  ACCOUNT: "/account",
  ADMIN: "/admin",

  MY_COLLECTION: "/my-collection",
} as const;

// Helper for dynamic routes
export const itemDetail = (slug: string) => `/marketplace/${slug}`;
export const orderDetail = (id: string) => `/account/orders/${id}`;
