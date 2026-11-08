import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MailCheck } from "lucide-react";

function VerifyEmailPage() {
  return (
    <section className="min-h-screen w-full flex items-start justify-center">
      <Card className="w-full max-w-sm my-30 p-4 shadow-md">
        <CardTitle className="flex items-center gap-2">
          <span>Verify Your Email</span>
          <MailCheck className="h-4.5 w-4.5 text-green-500 animate-bounce" />
        </CardTitle>
        <CardDescription>
          We&apos;ve sent a verification link to your email address. Please
          check your inbox and click the link to activate your account.
        </CardDescription>
      </Card>
    </section>
  );
}

export default VerifyEmailPage;
