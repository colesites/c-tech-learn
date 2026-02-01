import type { ReactNode } from "react";
import { Spinner } from "@/components/ui/spinner";
import { ngnToUsd } from "@/features/pricing/lib/currency";

export interface PricingState {
  currency: "NGN" | "USD";
  exchangeRate: number;
  loading: boolean;
}

export type CoursePlan = {
  slug: string;
  title: string;
  price: number; // ✅ NGN only
};

export type Plan = {
  id: string;
  title: string;
  description: string;
  highlight?: boolean;
  badge?: string;
  currency: string;
  monthlyPrice: string;
  yearlyPrice: string;
  monthlyAmount: number;
  yearlyAmount: number;
  buttonText: ReactNode;
  disabled: boolean;
  features: { name: string; icon: "check" | "x" }[];
};

/**
 * ✅ Normal pricing page: Free + Pro
 */
export function getPlans({
  pricingState,
  activeLoader,
}: {
  pricingState: PricingState;
  activeLoader: string | null;
}): Plan[] {
  const isNGN = pricingState.currency === "NGN";

  return [
    {
      id: "starter",
      title: "Free Tier",
      description:
        "Start your journey with essential tools and community access.",
      currency: isNGN ? "₦" : "$",
      monthlyPrice: "0",
      yearlyPrice: "0",
      monthlyAmount: 0,
      yearlyAmount: 0,
      buttonText:
        activeLoader === "starter" ? (
          <Spinner className="mr-2" />
        ) : (
          "Start Learning Free"
        ),
      disabled: activeLoader !== null,
      features: [
        { name: "Access to Free Topics", icon: "check" },
        { name: "Buy Individual Courses", icon: "check" },
        { name: "Community Access", icon: "check" },
        { name: "Basic Code Editor", icon: "check" },
      ],
    },
    {
      id: "pro",
      title: "Pro Access",
      description:
        "Accelerate your career with unlimited access and premium features.",
      highlight: true,
      badge: "Most Popular",
      currency: isNGN ? "₦" : "$",
      monthlyPrice: isNGN ? "1,000" : "0.70",
      yearlyPrice: isNGN ? "10,000" : "7.04",
      monthlyAmount: isNGN ? 1000 : 0.7,
      yearlyAmount: isNGN ? 10000 : 7.04,
      buttonText: activeLoader === "pro" ? <Spinner /> : "Get Pro Access",
      disabled: activeLoader !== null,
      features: [
        { name: "Access to All Courses", icon: "check" },
        { name: "Structured Learning Paths", icon: "check" },
        { name: "Interactive Quizzes", icon: "check" },
        { name: "Premium Support", icon: "check" },
        { name: "Certificate of Completion", icon: "check" },
      ],
    },
  ];
}

/**
 * ✅ Lesson/course paywall pricing: Course Only + Pro
 * (No free tier)
 */
export function getLessonPlans({
  pricingState,
  activeLoader,
  coursePlan,
}: {
  pricingState: PricingState;
  activeLoader: string | null;
  coursePlan: CoursePlan;
}): Plan[] {
  const isNGN = pricingState.currency === "NGN";

  const courseAmount = isNGN
    ? coursePlan.price
    : ngnToUsd(coursePlan.price, pricingState.exchangeRate);

  const display = isNGN
    ? coursePlan.price.toLocaleString()
    : courseAmount.toFixed(2);

  return [
    {
      id: coursePlan.slug,
      title: coursePlan.title,
      description: "One-time payment. Lifetime access to this course only.",
      currency: isNGN ? "₦" : "$",
      monthlyPrice: "-", // ✅ not monthly
      yearlyPrice: display, // ✅ just show the one-time price here
      monthlyAmount: 0,
      yearlyAmount: courseAmount, // ✅ paystack can use this
      buttonText:
        activeLoader === coursePlan.slug ? (
          <Spinner className="mr-2" />
        ) : (
          "Buy the course only"
        ),
      disabled: activeLoader !== null,
      features: [
        { name: "Lifetime access to this course", icon: "check" },
        { name: "Includes future updates", icon: "check" },
        { name: "Certificate (if available)", icon: "check" },
      ],
    },
    {
      id: "pro",
      title: "Pro Access",
      description: "Unlock all courses + premium features.",
      highlight: true,
      badge: "Best Value",
      currency: isNGN ? "₦" : "$",
      monthlyPrice: isNGN ? "1,000" : "0.70",
      yearlyPrice: isNGN ? "10,000" : "7.04",
      monthlyAmount: isNGN ? 1000 : 0.7,
      yearlyAmount: isNGN ? 10000 : 7.04,
      buttonText: activeLoader === "pro" ? <Spinner /> : "Get Pro Access",
      disabled: activeLoader !== null,
      features: [
        { name: "Access to All Courses", icon: "check" },
        { name: "Structured Learning Paths", icon: "check" },
        { name: "Interactive Quizzes", icon: "check" },
        { name: "Premium Support", icon: "check" },
        { name: "Certificate of Completion", icon: "check" },
      ],
    },
  ];
}
