"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";

type AuthMode = "sign-in" | "sign-up";

type AuthExtrasProps = {
  mode: AuthMode;
  onGoogle: () => void;
  onFacebook: () => void;
  disabled?: boolean;
};

const MODE_CONFIG = {
  "sign-in": {
    verb: "Sign in",
    question: "Don't have an account?",
    actionLabel: "Sign up",
    actionHref: ROUTES.SIGN_UP,
    showForgotPassword: true,
  },
  "sign-up": {
    verb: "Sign up",
    question: "Already have an account?",
    actionLabel: "Sign in",
    actionHref: ROUTES.SIGN_IN,
    showForgotPassword: false,
  },
} as const satisfies Record<AuthMode, unknown>;

export function AuthExtras({
  mode,
  onGoogle,
  onFacebook,
  disabled = false,
}: AuthExtrasProps) {
  const cfg = MODE_CONFIG[mode];

  return (
    <>
      {cfg.showForgotPassword && (
        <Link
          href="/forgot-password"
          className="text-primary hover:bg-background/10 border-accent-foreground -mt-3 w-full rounded-md border py-1 text-center"
        >
          Forgot Password
        </Link>
      )}

      <section className="w-full space-y-1">
        <Button
          type="button" // ⚠️ critical — see gotchas
          className="w-full hover:cursor-pointer hover:shadow-sm"
          variant="outline"
          onClick={onGoogle}
          disabled={disabled}
        >
          <div className="flex w-45 items-center gap-2">
            <FcGoogle />
            <span className="text-foreground">{cfg.verb} with Google</span>
          </div>
        </Button>

        <Button
          type="button"
          className="w-full hover:cursor-pointer hover:shadow-sm"
          variant="outline"
          onClick={onFacebook}
          disabled={disabled}
        >
          <div className="flex w-45 items-center gap-2">
            <SiFacebook className="text-blue-900" />
            <span className="text-foreground">{cfg.verb} with Facebook</span>
          </div>
        </Button>
      </section>

      <p className="text-muted-foreground text-sm">
        {cfg.question}{" "}
        <Link
          href={cfg.actionHref}
          className="text-primary hover:underline"
        >
          {cfg.actionLabel}
        </Link>
      </p>
    </>
  );
}
