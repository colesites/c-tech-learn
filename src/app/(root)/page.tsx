import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import CommunitySection from "@/components/CommunitySection";
import CoursesSection from "@/components/CoursesSection";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <BlogSection />
      <CommunitySection />
    </MaxWidthWrapper>
  );
}
