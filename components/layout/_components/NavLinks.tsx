import { ROUTES } from "@/app/constants/route";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const navLinks = [
  {
    route: ROUTES.MARKET_PLACE,
    label: "Market Place",
  },
  {
    route: ROUTES.MY_COLLECTION,
    label: "My Collection",
  },
];

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
