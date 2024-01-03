"server-only";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
