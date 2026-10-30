import { ROUTES } from "@/app/constants/route";
import Link from "next/link";
import { Button } from "../ui/button";

function Navbar() {
  return (
    <nav className="flex items-center gap-3">
      <Link href={ROUTES.SIGNIN}>
        <Button className="text-gray-700 hover:text-black" variant="ghost">
          Sign In
        </Button>
      </Link>
      <Link href={ROUTES.SIGNUP} className="">
        <Button className=" hover:bg-primary/80">Sign Up</Button>
      </Link>
    </nav>
  );
}

export default Navbar;
