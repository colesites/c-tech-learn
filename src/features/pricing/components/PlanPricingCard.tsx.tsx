"use client";

import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

type Feature = { name: string; icon: "check" | "x" };

type BillingCycle = "one_time" | "monthly_yearly";

export function PlanPricingCard({
  title,
  description,
  badge,
  currency,
  priceMain,
  priceSuffix,
  buttonText,
  loading,
  onBuy,
  features,
  billingType = "one_time",
  billingValue,
  onBillingChange,
}: {
  title: string;
  description?: string;
  badge?: string;

  currency: string;
  priceMain: string; // e.g "3,000" or "1,000"
  priceSuffix?: string; // e.g "/month" or "once"

  buttonText: string;
  loading?: boolean;
  onBuy: () => void;

  features: Feature[];

  // ✅ optional toggle for pro card
  billingType?: BillingCycle;
  billingValue?: "monthly" | "yearly";
  onBillingChange?: (v: "monthly" | "yearly") => void;
}) {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur md:min-h-[420px]">
      {/* badge */}
      <div className="flex items-start justify-between">
        <div>
          {badge ? (
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-pink-300">
              {badge}
            </span>
          ) : (
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-pink-400">
              ONE-TIME PAYMENT
            </span>
          )}

          <h3 className="mt-3 text-xl font-bold">{title}</h3>

          {description ? (
            <p className="mt-1 text-sm text-white/60">{description}</p>
          ) : null}
        </div>
      </div>

      {/* billing toggle (only if needed) */}
      {billingType === "monthly_yearly" && billingValue && onBillingChange ? (
        <div className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => onBillingChange("monthly")}
            className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition ${
              billingValue === "monthly"
                ? "bg-white/10 text-pink-200"
                : "text-white/60 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => onBillingChange("yearly")}
            className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition ${
              billingValue === "yearly"
                ? "bg-white/10 text-pink-200"
                : "text-white/60 hover:text-white"
            }`}
          >
            Yearly
          </button>
        </div>
      ) : null}

      {/* price */}
      <div className="mt-6 flex items-end gap-2">
        <span className="text-4xl font-bold">
          {currency}
          {priceMain}
        </span>
        {priceSuffix ? (
          <span className="text-sm text-white/50">{priceSuffix}</span>
        ) : null}
      </div>

      {/* button */}
      <Button
        onClick={onBuy}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-linear-to-r from-pink-500 to-purple-500"
      >
        {loading ? "Loading..." : buttonText}
      </Button>

      {/* features */}
      <ul className="mt-6 space-y-3 text-sm text-white/70">
        {features.map((f) => (
          <li key={f.name} className="flex items-center gap-2">
            {f.icon === "check" ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <X className="h-4 w-4 text-red-400" />
            )}
            <span>{f.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
