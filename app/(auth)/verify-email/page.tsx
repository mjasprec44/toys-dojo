import { MailCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/route";
import { getSession } from "@/lib/auth/auth";

async function VerifyEmailContent() {
  const session = await getSession();

  if (session) {
    redirect(ROUTES.MARKET_PLACE);
  }

  return (
    <Card className="w-full max-w-sm my-30 p-4 shadow-md">
      <CardTitle className="flex items-center gap-2">
        <span>Verify Your Email</span>
        <MailCheck className="h-4.5 w-4.5 text-green-500 animate-bounce" />
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
    <section className="min-h-screen w-full flex items-start justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailContent />
      </Suspense>
    </section>
  );
}
