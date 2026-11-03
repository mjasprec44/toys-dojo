import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserDataType } from "@/types";
import SignOutButton from "./SignOutButton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type UserProfileProps = {
  userData: UserDataType;
};

function UserMenu({ userData }: UserProfileProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale"
              />

              <AvatarFallback>{userData.name.slice(0, 1)}</AvatarFallback>
              <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div>
              <p>{userData.name}</p>

              <Tooltip>
                <TooltipTrigger
                  render={<p className="truncate">{userData.email}</p>}
                />
                <TooltipContent>
                  <p>{userData.email}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
