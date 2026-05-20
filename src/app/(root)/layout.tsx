import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="">
      <Header />
      {children}
      <Footer />
      <SanityLive />
    </section>
  );
}
