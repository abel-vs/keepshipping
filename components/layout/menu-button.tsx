"use client";
import { UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/providers/supabase-auth-provider";

export const MenuButton = () => {
  const router = useRouter();
  const auth = useAuth();

  const goToProfile = () => {
    router.push("/profile");
  };

  const goToGitHub = () => {
    const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || "";
    router.push(githubUrl);
  };

  const goToDiscord = () => {
    const discordUrl = process.env.NEXT_PUBLIC_DISCORD_URL || "";
    router.push(discordUrl);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mx-4 my-2">
        <DropdownMenuLabel>
          {auth.user?.user_metadata.user_name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={goToProfile}>Profile</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Join the team!</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={goToGitHub}>GitHub</DropdownMenuItem>
              <DropdownMenuItem onClick={goToDiscord}>Discord</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={auth.signOut} className="text-red-500">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
