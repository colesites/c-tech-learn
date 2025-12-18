import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="">
      <Header />
      {children}
      <Footer />
    </section>
  );
}
