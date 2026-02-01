"use client";

import { PricingTableFour } from "@/components/billinsdk/pricing-table-four";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import type { PaystackPaymentHandle } from "./PaystackPaymentProvider";
import { getPlans, PricingState } from "@/features/pricing/pricing-plans";

const PaystackPaymentProvider = dynamic(
  () => import("./PaystackPaymentProvider"),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

export default function PricingSection() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user as any;

  const [activeLoader, setActiveLoader] = useState<string | null>(null);
  const [isAnnually, setIsAnnually] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pricingState, setPricingState] = useState<PricingState>({
    currency: "NGN",
    exchangeRate: 1600, // Default fallback
    loading: true,
  });
  const paystackRef = useRef<PaystackPaymentHandle>(null);

  // Reset loader when path changes (navigation complete)
  useEffect(() => {
    setActiveLoader(null);
  }, [pathname]);

  useEffect(() => {
    let isMounted = true;
    const fetchLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) throw new Error("Location fetch failed");
        const data = await response.json();

        if (isMounted) {
          const isNigeria = data.country_code === "NG";
          setPricingState((prev: PricingState) => ({
            ...prev,
            currency: isNigeria ? "NGN" : "USD",
            loading: false,
          }));
        }
      } catch (error) {
        if (isMounted) {
          // Fallback silently if CORS/429/Network error occurs
          setPricingState((prev: PricingState) => ({
            ...prev,
            loading: false,
          }));
        }
      }
    };

    fetchLocation();
    return () => {
      isMounted = false;
    };
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      // Desktop Animation (min-width: 768px)
      // Includes: Slide up entrance, Fade in, Floating Pro card
      mm.add("(min-width: 768px)", () => {
        // Entrance Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          container,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
        );

        // Floating Animation for Pro Card
        const proCard = container.querySelector('[data-plan-id="pro"]');
        if (proCard) {
          gsap.to(proCard, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.5,
          });
        }
      });

      // Mobile Animation (max-width: 767px)
      // Includes: ONLY Fade in
      mm.add("(max-width: 767px)", () => {
        // Simple Fade In
        gsap.fromTo(
          container,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  // Auto-trigger payment if ?payment=pro is present
  useEffect(() => {
    if (pricingState.loading) return;

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("payment") === "pro") {
      if (user) {
        if (user.role !== "PRO") {
          paystackRef.current?.initialize();
        }
      }
    }
  }, [user, pricingState.loading]);

  const plans = getPlans({ pricingState, activeLoader });

  const proPlan = plans.find((p) => p.id === "pro");
  const currentAmount = isAnnually
    ? proPlan?.yearlyAmount ?? 0
    : proPlan?.monthlyAmount ?? 0;

  return (
    <div ref={containerRef} className="relative py-20 md:py-24" id="pricing">
      <PaystackPaymentProvider
        ref={paystackRef}
        email={user?.email || ""}
        amount={currentAmount}
        currency={pricingState.currency}
        billingCycle={isAnnually ? "yearly" : "monthly"}
      />
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
        onBillingCycleChange={setIsAnnually}
        onPlanSelect={(planId) => {
          if (planId === "starter") {
            if (!user) {
              setActiveLoader(planId);
              router.push("/sign-in");
            }
            // If user is logged in, do nothing (they already have free access)
          } else if (planId === "pro") {
            if (!user) {
              setActiveLoader(planId);
              router.push("/sign-in");
              return;
            }

            if (user.role === "PRO") {
              toast.info("You already have Pro Access!");
              return;
            }

            paystackRef.current?.initialize();
          }
        }}
      />
    </div>
  );
}
