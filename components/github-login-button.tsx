"use client";
import { LoaderIcon, GithubIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const GithubLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  async function signInWithGithub() {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    // Wait for the sign-in process to complete before redirecting
    if (data || error) {
      router.replace("/");
      setIsLoading(false);
    }
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
