"use client";
import { ROUTES } from "@/constants/route";
import { Form } from "@/components/storefront/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { resetPassword } from "@/lib/auth/auth-client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";

function ResetPasswordPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [isSubmitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (values: { newPassword: string }) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await resetPassword({
        newPassword: values.newPassword, // required, The new password to set
        token, // When set to true, all other active sessions for this user will be invalidated
      });

      if (res.error) {
        toast.error(res.error?.message || "Could not reset password");
      } else {
        toast.success("Password reset was successful");
        router.push(ROUTES.SIGN_IN);
      }
    } catch (error) {
      console.error(error);
      setServerError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) {
    return (
      <Card className="flex flex-col w-full max-w-md border-border shadow-lg animate-fade-in">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
          <CardDescription>
            This reset link is invalid or missing.
          </CardDescription>
        </CardHeader>
        <CardFooter className="border-0">
          <Button
            className="w-full"
            onClick={() => router.push(ROUTES.FORGOT_PASSWORD)}
          >
            Forgot Password
          </Button>
        </CardFooter>
      </Card>
    );
  }
  return (
    <Form
      title="Reset password"
      description=""
      submitLabel="Send"
      isSubmitting={isSubmitting}
      serverError={serverError}
      fields={[
        {
          name: "newPassword",
          label: "New Password",
          type: "password",
          required: true,
          minLength: 8,
          maxLength: 32,
        },
      ]}
      validate={() => {
        const errors: Record<string, string> = {};
        return errors;
      }}
      onSubmit={handleSubmit}
      // info={Info}
    />
  );
}

export default function ResetPasswordPage() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background p-4">
      <Suspense
        fallback={
          <Skeleton className="w-full h-52 max-w-md border-border shadow-lg" />
        }
      >
        <ResetPasswordPageContent />
      </Suspense>
    </section>
  );
}
