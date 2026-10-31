import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function HeroSection() {
  return (
    <section className="flex-1 bg-gray-100 py-20">
      <section className="container mx-auto px-4 py-32 animate-fade-in">
        <article className="border border-green-700 mx-auto max-w-4xl text-center">
          <h1 className="text-gray-900 mb-6 text-6xl font-bold leading-tight">
            A better way to buy and sell your collectibles
          </h1>
          <p className="text-muted-foreground mb-8 text-xl">
            Capture, organize, and manage your inventory in one place
          </p>

          <section className="flex flex-col items-center gap-4">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="h-12 px-8 text-lg font-medium hover:cursor-pointer"
              >
                Start for free <ArrowRight className="ml-1" />
              </Button>
            </Link>

            <p className="text-sm text-muted-foreground">
              Free forever. No credit card required.
            </p>
          </section>
        </article>
      </section>
    </section>
  );
}

export default HeroSection;
