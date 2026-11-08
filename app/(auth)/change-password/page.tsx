"use client";

import { Form } from "@/components/storefront/form";
import { changePassword } from "@/lib/auth/auth-client";
import { useState } from "react";
import { toast } from "sonner";

interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
}

function ChangePasswordPage() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (values: ChangePasswordValues) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await changePassword({
        newPassword: values.newPassword, // required, The new password to set
        currentPassword: values.currentPassword, // required, The current user password
        revokeOtherSessions: true, // When set to true, all other active sessions for this user will be invalidated
      });

      if (res.error) {
        setServerError(res.error?.message || "Failed to change password");
      } else {
        toast.success("Password changed successfully");
      }
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
        title="Change password"
        description=""
        submitLabel="Change password"
        isSubmitting={isSubmitting}
        serverError={serverError}
        fields={[
          {
            name: "currentPassword",
            label: "Current Password",
            type: "password",
            required: true,
            minLength: 8,
            maxLength: 32,
          },
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
    </section>
  );
}

export default ChangePasswordPage;
