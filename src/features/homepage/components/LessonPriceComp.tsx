"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import type { PaystackPaymentHandle } from "@/features/homepage/components/PaystackPaymentProvider";
import { PricingTableFour } from "@/components/billinsdk/pricing-table-four";
import PaystackPaymentProvider from "@/features/homepage/components/PaystackPaymentProvider";
import { toast } from "sonner";
import {
  getLessonPlans,
  type PricingState,
} from "@/features/pricing/pricing-plans";
import { PlanPricingCard } from "@/features/pricing/components/PlanPricingCard.tsx";

type CheckoutIntent =
  | { type: "course"; planId: string }
  | { type: "pro"; planId: "pro" }
  | null;

export default function LessonPriceCompClient({
  coursePlan,
}: {
  coursePlan: { slug: string; title: string; price: number };
}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user as any;

  const paystackRef = useRef<PaystackPaymentHandle>(null);

  const [activeLoader, setActiveLoader] = useState<string | null>(null);

  // Pro billing toggle only
  const [isAnnually, setIsAnnually] = useState(false);

  // Track what user is trying to buy (course vs pro)
  const [checkoutIntent, setCheckoutIntent] = useState<CheckoutIntent>(null);

  const [pricingState] = useState<PricingState>({
    currency: "NGN",
    exchangeRate: 1600,
    loading: false,
  });

  // ✅ get both plans (course + pro)
  const plans = getLessonPlans({ pricingState, activeLoader, coursePlan });

  const courseOnlyPlan = plans.find((p) => p.id === coursePlan.slug);
  const proPlan = plans.find((p) => p.id === "pro");

  // ✅ compute amount depending on intent
  const currentAmount =
    checkoutIntent?.type === "course"
      ? courseOnlyPlan?.yearlyAmount ?? 0 // course is one-time
      : checkoutIntent?.type === "pro"
      ? isAnnually
        ? proPlan?.yearlyAmount ?? 0
        : proPlan?.monthlyAmount ?? 0
      : 0;

  // ✅ billingCycle depends on intent
  const billingCycle =
    checkoutIntent?.type === "pro"
      ? isAnnually
        ? "yearly"
        : "monthly"
      : "one_time";

  // ✅ BUY COURSE ONLY
  const handleBuyCourseOnly = () => {
    if (!courseOnlyPlan) return;

    if (!user) {
      setActiveLoader(courseOnlyPlan.id);
      router.push("/sign-in");
      return;
    }

    setCheckoutIntent({ type: "course", planId: courseOnlyPlan.id });
    setActiveLoader(courseOnlyPlan.id);
    paystackRef.current?.initialize();
  };

  // ✅ BUY PRO
  const handleBuyPro = () => {
    if (!proPlan) return;

    if (!user) {
      setActiveLoader("pro");
      router.push("/sign-in");
      return;
    }

    if (user.role === "PRO") {
      toast.info("You already have Pro Access!");
      return;
    }

    setCheckoutIntent({ type: "pro", planId: "pro" });
    setActiveLoader("pro");
    paystackRef.current?.initialize();
  };

  return (
    <div className="relative py-20 md:py-24">
      <PaystackPaymentProvider
        ref={paystackRef}
        email={user?.email || ""}
        amount={currentAmount}
        currency={pricingState.currency}
        billingCycle={billingCycle as any}
      />

      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        {/* ✅ Course-only */}
        {courseOnlyPlan ? (
          <PlanPricingCard
            title={courseOnlyPlan.title}
            description="Lifetime access to this course only."
            currency={courseOnlyPlan.currency}
            priceMain={courseOnlyPlan.yearlyPrice}
            priceSuffix="once"
            buttonText="Buy the course only"
            features={courseOnlyPlan.features}
            loading={activeLoader === courseOnlyPlan.id}
            onBuy={handleBuyCourseOnly}
            billingType="one_time"
          />
        ) : null}

        {/* ✅ Pro */}
        {proPlan ? (
          <PlanPricingCard
            title="Pro Access"
            description="Unlock all courses + premium features."
            badge="Best Value"
            currency={proPlan.currency}
            priceMain={isAnnually ? proPlan.yearlyPrice : proPlan.monthlyPrice}
            priceSuffix={isAnnually ? "/year" : "/month"}
            buttonText="Get Pro Access"
            features={proPlan.features}
            loading={activeLoader === "pro"}
            onBuy={handleBuyPro}
            billingType="monthly_yearly"
            billingValue={isAnnually ? "yearly" : "monthly"}
            onBillingChange={(v) => setIsAnnually(v === "yearly")}
          />
        ) : null}
      </div>
    </div>
  );
}
