import { ROUTES } from "@/app/constants/route";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function NavLinks() {
  return (
    <ul>
      <Link href={ROUTES.MARKET_PLACE}>
        <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
          Market Place
        </Button>
      </Link>
      <Link href={ROUTES.MY_COLLECTION}>
        <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
          My Collection
        </Button>
      </Link>
    </ul>
  );
}

export default NavLinks;
