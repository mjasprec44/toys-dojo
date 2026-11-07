import { betterAuth, User } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { getMongoUri } from "../dbConnect";
import { sendEmail } from "../email";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import { initializeUserBoard } from "../init-user-board";
import { ROUTES } from "@/app/constants/route";

const client = new MongoClient(getMongoUri());
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    onExistingUserSignUp: async ({ user }: { user: User }) => {
      void sendEmail({
        to: user.email,
        subject: "Sign-up attempt with your email",
        text: "Someone tried to create an account using your email address. If this was you, try signing in instead. If not, you can safely ignore this email.",
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      void sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID! as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET! as string,
      scopes: [
        "email",
        "public_profile",
        "user_link",
        "user_location",
        "user_photos",
      ],
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes (adjust based on your security needs)
    },
  },
  plugins: [nextCookies()],
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user) {
            await initializeUserBoard(user.id);
          }
        },
      },
    },
  },
});

/**
 * Retrieves the session for the current request.
 * - Uses React's `cache` to deduplicate calls within the same server request.
 * - Leverages Better Auth's `cookieCache` (if enabled in auth.ts)
 *   to avoid database hits on subsequent requests.
 */
export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

export const signOut = async () => {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  if (result.success) {
    redirect(ROUTES.SIGN_IN);
  }
};
