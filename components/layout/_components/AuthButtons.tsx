import { ROUTES } from "@/app/constants/route";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function AuthButtons() {
  return (
    <section className="flex items-center gap-3">
      <Link href={ROUTES.SIGNIN} className="">
        <Button
          className="text-gray-700 hover:text-black hover:cursor-pointer"
          variant="ghost"
        >
          Sign In
        </Button>
      </Link>
      <Link href={ROUTES.SIGNUP} className="">
        <Button className="hover:bg-primary/80 hover:cursor-pointer">
          Sign Up
        </Button>
      </Link>
    </section>
  );
}

export default AuthButtons;
