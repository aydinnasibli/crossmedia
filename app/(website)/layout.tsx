import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TopUtilityBar } from "@/components/layout/TopUtilityBar";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopUtilityBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
