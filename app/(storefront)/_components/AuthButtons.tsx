import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function AuthButtons() {
  return (
    <section className="flex flex-col items-center gap-4">
      <Link href="/sign-up">
        <Button size="lg" className="h-12 px-8 text-lg font-medium">
          Start for free <ArrowRight className="ml-1" />
        </Button>
      </Link>

      <p className="text-sm text-muted-foreground">
        Free forever. No credit card required.
      </p>
    </section>
  );
}

export default AuthButtons;
