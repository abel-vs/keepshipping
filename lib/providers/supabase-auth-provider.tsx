"use client";

import { createClient } from "@/utils/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";

interface AuthContextProps {
  user: User | null | undefined;
  signOut: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signOut: async () => {},
  signInWithGitHub: async () => {},
});

export default function SupabaseAuthProvider({
  serverSession,
  children,
}: {
  serverSession?: Session | null;
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const router = useRouter();

  const user = serverSession?.user ?? null;

  // Sign Out
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/landing");
  };

  // Sign-In with Github
  const signInWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  // Refresh the Page to Sync Server and Client
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverSession?.access_token) {
        console.log("Refresh");
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, serverSession?.access_token]);

  const exposed: AuthContextProps = {
    user,
    signOut,
    signInWithGitHub,
  };

  return (
    <AuthContext.Provider value={exposed}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  let context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used inside SupabaseAuthProvider");
  } else {
    return context;
  }
};
