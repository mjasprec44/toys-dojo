import AuthButtons from "./_components/AuthButtons";
import NavLinks from "./_components/NavLinks";
import UserMenu from "./_components/UserMenu";
import { getSession } from "@/lib/auth/auth";

export default async function Navbar() {
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
