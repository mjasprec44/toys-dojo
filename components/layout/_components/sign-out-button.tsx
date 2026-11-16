"use client";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants/route";
import { signOut } from "@/lib/auth/auth-client";

function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(ROUTES.SIGN_IN);
          router.refresh();
        },
      },
    });
  };

  return (
    <DropdownMenuItem
      onClick={handleSignOut}
      className="text-sm text-muted-foreground cursor-pointer"
    >
      Log Out
      <DropdownMenuShortcut>
        <IoIosLogOut />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}

export default SignOutButton;
