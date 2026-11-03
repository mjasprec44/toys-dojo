import { Suspense } from "react";
import { ROUTES } from "@/app/constants/route";
import { Bot } from "lucide-react";
import Navbar from "./navbar";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

function Header() {
  return (
    <header className="bg-background border-b border-primary/40">
      <section className="container mx-auto h-16 flex items-center justify-between p-4">
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-3 text-primary"
        >
          <Bot size={36} />
          <h1 className="text-xl text-primary font-semibold pt-1 tracking-widest">
            Toys Dojo
          </h1>
        </Link>

        <Suspense fallback={<Skeleton className="h-6 w-62.5" />}>
          <Navbar />
        </Suspense>
      </section>
    </header>
  );
}

export default Header;
