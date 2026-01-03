import AboutSection from "@/features/homepage/components/AboutSection";
import BlogSection from "@/features/homepage/components/BlogSection";
import CommunitySection from "@/features/homepage/components/CommunitySection";
import ContactSection from "@/features/homepage/components/ContactSection";
import CoursesSection from "@/features/homepage/components/CoursesSection";
import FAQSection from "@/features/homepage/components/FAQSection";
import HeroSection from "@/features/homepage/components/HeroSection";
import HowItWorksSection from "@/features/homepage/components/HowItWorksSection";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PricingSection from "@/features/homepage/components/PricingSection";
import TestimonialsSection from "@/features/homepage/components/TestimonialsSection";

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
      <FAQSection />
      <ContactSection />
    </MaxWidthWrapper>
  );
}
