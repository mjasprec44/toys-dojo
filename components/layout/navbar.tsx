import { getSession } from "@/lib/auth/auth";
import AuthButtons from "./_components/auth-buttons";
import NavLinks from "./_components/nav-links";
import UserMenu from "./_components/user-menu";

async function Navbar() {
  const session = await getSession();

  return (
    <nav className="flex items-center gap-2">
      {session ? (
        <>
          <NavLinks />
          <UserMenu userData={session.user} />
        </>
      ) : (
        <AuthButtons />
      )}
    </nav>
  );
}

export default Navbar;
