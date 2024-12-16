import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentSession, signOutAction } from "@/actions";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { JSX } from "react";
import { SignOutFormComponent } from "./SignOutForm";

export const Navbar = async (): Promise<JSX.Element | null> => {
  const { user, session } = await getCurrentSession();

  if (session === null) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="pr-4 py-3 flex justify-end items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={user?.picture || "/default-avatar.png"}
                alt={`${user?.name || "User"}'s avatar`}
              />
              <AvatarFallback>
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <SignOutFormComponent action={signOutAction}>
                <Button variant="ghost" className="w-full justify-start">
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </>
                </Button>
              </SignOutFormComponent>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
