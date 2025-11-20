"use client";

import { PricingTableFour } from "@/components/billinsdk/pricing-table-four";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PricingState {
  currency: "NGN" | "USD";
  exchangeRate: number; // 1 USD to NGN
  loading: boolean;
}

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pricingState, setPricingState] = useState<PricingState>({
    currency: "NGN",
    exchangeRate: 1600, // Default fallback
    loading: true,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Using ipapi.co to determine location
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        const isNigeria = data.country_code === "NG";

        setPricingState((prev) => ({
          ...prev,
          currency: isNigeria ? "NGN" : "USD",
          loading: false,
        }));
      } catch (error) {
        console.error("Failed to fetch location for pricing:", error);
        // Fallback to NGN as base currency
        setPricingState((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchLocation();
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // Create a timeline for a more choreographed entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate container opacity
      tl.fromTo(container, { opacity: 0 }, { opacity: 1, duration: 0.5 });

      // We can target specific elements if we add classes, but for now,
      // let's enhance the overall container movement
      tl.fromTo(
        container,
        { y: 60 },
        {
          y: 0,
          duration: 1,
          ease: "power4.out",
        },
        "<" // Start at the same time as opacity
      );

      // Add a subtle continuous floating animation for the Pro card
      // We need to wait for the DOM to be fully rendered/hydrated
      // so we use a slight delay or check
      const proCard = container.querySelector('[data-plan-id="pro"]');
      if (proCard) {
        gsap.to(proCard, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5, // Wait for entrance animation
        });
      }
    },
    { scope: containerRef }
  );

  const plans = [
    {
      id: "starter", // Maps to Package icon in PricingTableFour
      title: "Free Tier",
      description:
        "Start your journey with essential tools and community access.",
      currency: pricingState.currency === "NGN" ? "₦" : "$",
      monthlyPrice: "0",
      yearlyPrice: "0",
      buttonText: "Start Learning Free",
      features: [
        {
          name: "Access to Free Topics",
          icon: "check",
        },
        {
          name: "Buy Individual Courses",
          icon: "check",
        },
        {
          name: "Community Access",
          icon: "check",
        },
        {
          name: "Basic Code Editor",
          icon: "check",
        },
      ],
    },
    {
      id: "pro", // Maps to Award icon in PricingTableFour
      title: "Pro Access",
      description:
        "Accelerate your career with unlimited access and premium features.",
      highlight: true,
      badge: "Most Popular",
      currency: pricingState.currency === "NGN" ? "₦" : "$",
      monthlyPrice: pricingState.currency === "NGN" ? "4,000" : "5",
      // Yearly: 40% discount.
      // NGN: 4000 * 12 * 0.6 = 28800
      // USD: 5 * 12 * 0.6 = 36
      yearlyPrice: pricingState.currency === "NGN" ? "28,800" : "36",
      buttonText: "Get Pro Access",
      features: [
        {
          name: "Access to All Courses",
          icon: "check",
        },
        {
          name: "Structured Learning Paths",
          icon: "check",
        },
        {
          name: "Interactive Quizzes",
          icon: "check",
        },
        {
          name: "Premium Support",
          icon: "check",
        },
        {
          name: "Certificate of Completion",
          icon: "check",
        },
      ],
    },
  ];

  return (
    <div ref={containerRef} className="w-full">
      <PricingTableFour
        plans={plans}
        title="Start Your Tech Journey Today"
        subtitle="Flexible Pricing"
        description="Choose the plan that fits your learning style. From free starter essentials to comprehensive pro features, we have you covered."
        theme="classic"
        size="medium"
        showBillingToggle={true}
        billingToggleLabels={{
          monthly: "Monthly",
          yearly: "Yearly",
        }}
        className="w-full"
        onPlanSelect={(planId) => console.log("Selected plan:", planId)}
      />
    </div>
  );
}
