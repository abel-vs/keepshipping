import { GithubLoginButton } from "@/components/github-login-button";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createClient(cookies());
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return (
    <div className="flex-1 w-full flex flex-col gap-4 items-center justify-center">
      <span className="text-7xl">🚢</span>

      <h1 className="text-4xl font-bold">keep shipping.</h1>
      <div className="p-8">
        {user ? (
          "hi " +
          (user.user_metadata.name
            ? user.user_metadata.name.toLowerCase()
            : "") +
          "!" +
          "\nkeepshipping is coming soon! like... in one/two days ;)"
        ) : (
          <GithubLoginButton />
        )}
      </div>
    </div>
  );
}
