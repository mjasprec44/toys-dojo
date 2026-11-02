import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [],
});

export const signInWithSocial = async (provider: "facebook" | "google") => {
  const data = await authClient.signIn.social({ provider });
  return data;
};

export const { signIn, signUp, signOut, useSession } = authClient;
