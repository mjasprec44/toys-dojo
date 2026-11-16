import Link from "next/link";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/constants/nav-links";

export default function NavLinks() {
  return (
    <ul className="flex items-center gap-2">
      {navLinks.map((link) => (
        <li key={link.label}>
          <Link href={link.route}>
            <Button
              variant="ghost"
              className="text-foreground hover:bg-muted hover:cursor-pointer"
            >
              {link.label}
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
