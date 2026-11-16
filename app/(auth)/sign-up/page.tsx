"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { AuthExtras } from "../_component/AuthExtras";
import { signUpSchema } from "../_lib/schemas";
import { SignUpValues } from "../_types/auth.types";
import { Form } from "@/components/shared/form/FormCard";
import { ROUTES } from "@/constants/route";
import { signInWithSocial, signUp } from "@/lib/auth/auth-client";
import { FormHandle } from "@/types/form.types";

function SignUp() {
  const router = useRouter();
  const formRef = useRef<FormHandle>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleLoginWithGoogle = async () => {
    await signInWithSocial("google");
  };

  const handleLoginWithFacebook = async () => {
    await signInWithSocial("facebook");
  };

  const handleSubmit = async (values: SignUpValues) => {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
        callbackURL: ROUTES.MARKET_PLACE,
      });

      if (res.error) {
        setServerError(res.error.message ?? "Failed to sign up");
      } else {
        formRef.current?.reset();
        // 1. Invalidate the router cache so server components re-run
        router.refresh();

        // 2. Then navigate to the verify email page
        router.refresh();
        router.push(ROUTES.VERIFY_EMAIL);
      }
    } catch (error) {
      console.error(error);
      setServerError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-background flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4">
      <Form
        title="Create your account"
        description="We'll email you a link to verify your address."
        submitLabel="Create account"
        isSubmitting={isSubmitting}
        serverError={serverError}
        fields={[
          {
            name: "name",
            label: "Full name",
            type: "text",
            required: true,
            minLength: 2,
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "you@example.com",
            required: true,
            minLength: 8,
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
            description: "At least 8 characters.",
            minLength: 8,
          },
          {
            name: "confirmPassword",
            label: "Confirm password",
            type: "password",
            required: true,
            description: "Confirm your password.",
            minLength: 8,
          },
        ]}
        onSubmit={handleSubmit}
        info={
          <AuthExtras
            mode="sign-up"
            onGoogle={handleLoginWithGoogle}
            onFacebook={handleLoginWithFacebook}
          />
        }
        schema={signUpSchema}
      />
    </section>
  );
}

export default SignUp;
