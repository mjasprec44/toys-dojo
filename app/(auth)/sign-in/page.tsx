"use client";
import { ROUTES } from "@/app/constants/route";
import { Form } from "@/components/storefront/Form";
import { FormValues } from "@/types/form.types";
import Link from "next/link";
import { useState } from "react";

function SIGN_IN() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const Info = (
    <p className="text-sm text-muted-foreground">
      Don&apos;t have an account?{" "}
      <Link href="/sign-up" className="text-primary hover:underline">
        Sign up
      </Link>
    </p>
  );

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch(`/api${ROUTES.SIGN_IN}`, {
        method: "POST",
      });
    } catch (error) {
      console.error(error);
      setServerError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
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
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
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
