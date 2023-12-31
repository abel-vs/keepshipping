"use client";
import { LoaderIcon, GithubIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";

export const GithubLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  async function signInWithGithub() {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    setIsLoading(false);
  }

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      onClick={signInWithGithub}
    >
      {isLoading ? (
        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <GithubIcon className="mr-2 h-4 w-4" />
      )}{" "}
      link your Github
    </Button>
  );
};
