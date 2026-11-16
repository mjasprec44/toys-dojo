"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { Form } from "@/components/shared/form/FormCard";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";
import { signIn, signInWithSocial } from "@/lib/auth/auth-client";
import { SignInValues } from "@/types";

function SignIn() {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleLoginWithGoogle = async () => {
    await signInWithSocial("google");
  };

  const handleLoginWithFacebook = async () => {
    await signInWithSocial("facebook");
  };

  const Info = (
    <>
      <Link
        href="/forgot-password"
        className="text-primary hover:bg-background/10 border-accent-foreground -mt-3 w-full rounded-md border py-1 text-center"
      >
        Forgot Password
      </Link>
      <section className="w-full space-y-1">
        <Button
          className="w-full hover:cursor-pointer hover:shadow-sm"
          variant="outline"
          onClick={handleLoginWithGoogle}
        >
          <div className="flex w-45 items-center gap-2">
            <FcGoogle />
            <span className="text-foreground">Sign in with Google</span>
          </div>
        </Button>

        <Button
          className="w-full hover:cursor-pointer hover:shadow-sm"
          variant="outline"
          onClick={handleLoginWithFacebook}
        >
          <div className="flex w-45 items-center gap-2">
            <SiFacebook className="text-blue-900" />
            <span className="text-foreground">Sign in with Facebook</span>
          </div>
        </Button>
      </section>
      <p className="text-muted-foreground text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-primary hover:underline"
        >
          Sign up
        </Link>
      </p>
    </>
  );

  const handleSubmit = async (values: SignInValues) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await signIn.email({
        email: values.email,
        password: values.password,
      });

      if (res.error) {
        setServerError(res.error.message || "Failed to sign in");
      } else {
        router.refresh();
        router.push(ROUTES.DASHBOARD);
      }
    } catch (error) {
      console.error(error);
      setServerError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-background flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Form
        title="Sign in to your account"
        description="Enter your email and password to sign in."
        submitLabel="Sign in"
        isSubmitting={isSubmitting}
        serverError={serverError}
        fields={[
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "you@example.com",
            required: true,
            minLength: 2,
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
            minLength: 2,
          },
        ]}
        validate={() => {
          const errors: Record<string, string> = {};
          return errors;
        }}
        onSubmit={handleSubmit}
        info={Info}
      />
    </section>
  );
}

export default SignIn;
