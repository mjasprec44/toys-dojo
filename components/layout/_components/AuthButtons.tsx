import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function AuthButtons() {
  return (
    <section className="flex items-center gap-3">
      <Link
        href={ROUTES.SIGN_IN}
        className=""
      >
        <Button
          className="text-foreground hover:cursor-pointer"
          variant="ghost"
        >
          Sign In
        </Button>
      </Link>
      <Link
        href={ROUTES.SIGN_UP}
        className=""
      >
        <Button className="hover:bg-primary hover:cursor-pointer">
          Sign Up
        </Button>
      </Link>
    </section>
  );
}
