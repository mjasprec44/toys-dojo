"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthExtras } from "../_component/AuthExtras";
import { signInSchema } from "../_lib/schemas";
import { Form } from "@/components/shared/form/FormCard";
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
        info={
          <AuthExtras
            mode="sign-in"
            onGoogle={handleLoginWithGoogle}
            onFacebook={handleLoginWithFacebook}
          />
        }
        schema={signInSchema}
      />
    </section>
  );
}

export default SignIn;
