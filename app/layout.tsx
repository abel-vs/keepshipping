import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Rubik } from "next/font/google";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
