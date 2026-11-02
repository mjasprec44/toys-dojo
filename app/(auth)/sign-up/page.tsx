"use client";
import { Form } from "@/components/storefront/Form";
import Link from "next/link";
import { useState } from "react";

function SIGN_UP() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const Info = (
    <p className="text-sm text-muted-foreground">
      Already have an account?{" "}
      <Link href="/sign-in" className="text-primary hover:underline">
        Sign in
      </Link>
    </p>
  );

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
      <Form
        title="Create your account"
        description="We'll email you a link to verify your address."
        submitLabel="Create account"
        isSubmitting={isSubmitting}
        serverError={serverError}
        fields={[
          { name: "name", label: "Full name", type: "text", required: true },
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
            description: "At least 8 characters.",
          },
          {
            name: "confirmPassword",
            label: "Confirm password",
            type: "password",
            required: true,
            description: "Confirm your password.",
          },
          {
            name: "phone",
            label: "Phone number",
            type: "tel",
            required: true,
            description: "Format: +639123456789",
          },
        ]}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          // ✅ values is inferred as:
          // {
          //   name: string;
          //   email: string;
          //   password: string;
          //   role: string;
          //   bio: string;
          //   terms: boolean;
          // }
          setSubmitting(true);
          setServerError(null);
          try {
            const res = await fetch("/api/SIGN_UP", {
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

export default SIGN_UP;
