import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Rubik } from "next/font/google";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import SupabaseAuthProvider from "@/lib/providers/supabase-auth-provider";
import { ThemeProvider } from "@/lib/providers/theme-provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// If loading a variable font, you don't need to specify the font weight
const font = Rubik({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "keepshipping",
  description: "keep shipping.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient(cookies());

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" className={font.className}>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SupabaseAuthProvider serverSession={session}>
            <main className="min-h-screen flex flex-col items-center">
              {children}
            </main>
            <Toaster />
          </SupabaseAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
