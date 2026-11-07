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
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserDataType } from "@/types";
import SignOutButton from "./sign-out-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "./mode-toggle";

type UserProfileProps = {
  userData: UserDataType;
};

function UserMenu({ userData }: UserProfileProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="rounded-full hover:bg-transparent! hover:cursor-pointer"
          >
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale"
              />

              <AvatarFallback>
                {userData.name.slice(0, 1).toUpperCase()}
              </AvatarFallback>
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

        <ModeToggle />

        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
