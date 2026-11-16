import { MailCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { getSession } from "@/lib/auth/auth";

async function VerifyEmailContent() {
  const session = await getSession();

  if (session) {
    redirect(ROUTES.MARKET_PLACE);
  }

  return (
    <Card className="my-30 w-full max-w-sm p-4 shadow-md">
      <CardTitle className="flex items-center gap-2">
        <span>Verify Your Email</span>
        <MailCheck className="h-4.5 w-4.5 animate-bounce text-green-500" />
      </CardTitle>

      <CardDescription>
        We&apos;ve sent a verification link to your email address. Please check
        your inbox and click the link to activate your account.
      </CardDescription>
    </Card>
  );
}

export default function VerifyEmailPage() {
  return (
    <section className="flex min-h-screen w-full items-start justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailContent />
      </Suspense>
    </section>
  );
}
