import { getSession } from "@/lib/auth/auth";
import ForgotPasswordContent from "./_component/forgot-password-content";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function ForgotPasswordContentContainer() {
  const session = await getSession();

  return <ForgotPasswordContent userEmail={session?.user.email} />;
}

export default async function ForgotPasswordPage() {
  return (
    <Suspense fallback={<Skeleton className="h-6 w-3xl" />}>
      <ForgotPasswordContentContainer />
    </Suspense>
  );
}
