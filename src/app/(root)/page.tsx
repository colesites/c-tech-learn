import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <HeroSection />
      <AboutSection />
    </MaxWidthWrapper>
  );
}
