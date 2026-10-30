// src/config/routes.ts
export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  CART: "/cart",
  CHECKOUT: "/checkout",
  SIGNUP: "/sign-up",
  SIGNIN: "/sign-in",
  ACCOUNT: "/account",
  ADMIN: "/admin",
} as const;

// Helper for dynamic routes
export const productDetail = (slug: string) => `/products/${slug}`;
export const orderDetail = (id: string) => `/account/orders/${id}`;
