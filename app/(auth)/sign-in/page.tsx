"use client";

import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";

import { Form } from "@/components/storefront/Form";
import { Button } from "@/components/ui/button";
import { signIn, signInWithSocial } from "@/lib/auth/auth-client";
import { SignInValues } from "@/types";

function SIGN_IN() {
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
      <section className="w-full space-y-1">
        <Button
          className="w-full hover:cursor-pointer hover:shadow-sm"
          variant="outline"
          onClick={handleLoginWithGoogle}
        >
          <div className="flex gap-2 items-center w-45">
            <FcGoogle />
            <span className="text-gray-800">Sign in with Google</span>
          </div>
        </Button>

        <Button
          className="w-full hover:cursor-pointer hover:shadow-sm"
          variant="outline"
          onClick={handleLoginWithFacebook}
        >
          <div className="flex gap-2 items-center w-45">
            <SiFacebook className="text-blue-900" />
            <span className="text-gray-800">Sign in with Facebook</span>
          </div>
        </Button>
      </section>
      <p className="text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );

  const handleSubmit = async (values: SignInValues) => {
    setSubmitting(true);
    setServerError(null);
    try {
      // const res = await signIn({
      //   email: values.email,
      //   password: values.password,
      // });
    } catch (error) {
      console.error(error);
      setServerError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background p-4">
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
        onSubmit={async (values) => {
          setSubmitting(true);
          setServerError(null);
          try {
            const res = await fetch("/api/sign-in", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });
            if (!res.ok) {
              const data = await res.json();
              setServerError(data.message ?? "Something went wrong.");
            }
          } finally {
            setSubmitting(false);
          }
        }}
        info={Info}
      />
    </section>
  );
}

export default SIGN_IN;
