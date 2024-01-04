"use client";
import { GithubIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/lib/providers/supabase-auth-provider";

export const GithubLoginButton = () => {
  const auth = useAuth();

  return (
    <Button variant="outline" type="button" onClick={auth.signInWithGitHub}>
      <GithubIcon className="mr-2 h-4 w-4" />
      link your Github
    </Button>
  );
};
