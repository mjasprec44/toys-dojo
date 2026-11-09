"use client";

import { ROUTES } from "@/app/constants/route";
import { Form } from "@/components/storefront/form";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import { requestPasswordReset } from "@/lib/auth/auth-client";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordContent() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async ({ email }: { email: string }) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await requestPasswordReset({
        email: email, // required, The new password to set
        redirectTo: ROUTES.RESET_PASSWORD, // When set to true, all other active sessions for this user will be invalidated
      });

      if (res.error) {
        toast.error(res.error?.message || "Could not send reset email");
      } else {
        toast.success("Reset link has been sent to your email");
        setSent(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background p-4">
      {sent ? (
        <Item className="w-full max-w-md border-border shadow-lg animate-fade-in">
          <ItemContent>
            <ItemTitle>Reset password request</ItemTitle>
            <ItemDescription>
              If that email address is in our system, we’ve sent you a password
              reset link.
            </ItemDescription>
          </ItemContent>
          <ItemMedia variant="icon">
            <Button
              variant="ghost"
              onClick={() => setSent(false)}
              className="hover:cursor-pointer"
            >
              <X className="h-4 w-4" />
            </Button>
          </ItemMedia>
        </Item>
      ) : (
        <Form
          title="Forgot your password?"
          description="No worries! Enter your email below, and we'll send you instructions to create a new one."
          submitLabel="Send"
          isSubmitting={isSubmitting}
          serverError={serverError}
          fields={[
            {
              name: "email",
              label: "Your email",
              type: "email",
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
      )}
    </section>
  );
}
