import { GithubLoginButton } from "@/components/github-login-button";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const LandingPage = async () => {
  const supabase = createClient(cookies());
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return (
    <div className="flex-1 w-full flex flex-col gap-4 items-center justify-center">
      <span className="text-8xl">🚢</span>
      <h1 className="text-5xl font-bold">keepshipping</h1>
      <h2 className="text-2xl">a social media for builders</h2>
      <div className="p-8">
        <GithubLoginButton />
      </div>
      {JSON.stringify(user)}
    </div>
  );
};

export default LandingPage;
