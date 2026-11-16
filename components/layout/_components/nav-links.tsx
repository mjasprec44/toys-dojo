import Link from "next/link";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/constants/nav-links";

function NavLinks() {
  return (
    <ul className="flex items-center gap-2">
      {navLinks.map((link) => (
        <li key={link.label}>
          <Link href={link.route}>
            <Button
              variant="ghost"
              className="text-foreground hover:cursor-pointer hover:bg-muted"
            >
              {link.label}
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NavLinks;
