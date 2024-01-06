"server-only";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Topbar } from "@/components/layout/top-bar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="md:hidden w-full">
        <Topbar />
      </div>
      <div className="hidden md:block w-full">
        <Header />
      </div>
      {children}
      <Footer />
    </>
  );
}
