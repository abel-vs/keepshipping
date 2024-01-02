"use client";
import { UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export const MenuButton = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    fetchUser();
  }, []);

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

  const logOut = () => {
    supabase.auth.signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mx-4 my-2">
        <DropdownMenuLabel>{user?.user_metadata.user_name}</DropdownMenuLabel>
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
        <DropdownMenuItem onClick={logOut} className="text-red-500">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
