"use client";
import { ROUTES } from "@/app/constants/route";
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth/auth-client";

import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";

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
