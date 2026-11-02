"use client";
import { useState, useRef } from "react";
import { Form } from "@/components/storefront/Form";
import { signInWithSocial, signUp } from "@/lib/auth/auth-client";
import { SignUpValues } from "@/types/auth.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormHandle } from "@/types/form.types";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";

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

  const Info = (
    <>
      <section className="w-full space-y-1">
        <Button
          className="w-full"
          variant="outline"
          onClick={handleLoginWithGoogle}
        >
          <div className="flex gap-2 items-center w-45">
            <FcGoogle />
            <span className="text-gray-800">Sign up with Google</span>
          </div>
        </Button>

        <Button
          className="w-full"
          variant="outline"
          onClick={handleLoginWithFacebook}
        >
          <div className="flex gap-2 items-center w-45">
            <SiFacebook className="text-blue-900" />
            <span className="text-gray-800">Sign up with Facebook</span>
          </div>
        </Button>
      </section>
      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </>
  );

  const handleSubmit = async (values: SignUpValues) => {
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (res.error) {
        setServerError(res.error.message ?? "Failed to sign up");
      } else {
        formRef.current?.reset();
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      setServerError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
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
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
        info={Info}
      />
    </section>
  );
}

export default SignUp;
