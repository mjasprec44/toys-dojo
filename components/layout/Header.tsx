import { Bot } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import Navbar from "./Navbar";
import { ROUTES } from "@/constants/routes";

export default function Header() {
  return (
    <header className="bg-background border-b">
      <section className="container mx-auto flex h-16 items-center justify-between p-4">
        <Link
          href={ROUTES.HOME}
          className="text-foreground flex items-center gap-3"
        >
          <Bot size={36} />
          <h1 className="text-foreground pt-1 text-xl font-semibold tracking-widest">
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
