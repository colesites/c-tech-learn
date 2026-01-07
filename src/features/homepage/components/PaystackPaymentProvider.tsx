"use client";

import { usePaystackPayment } from "react-paystack";
import { PLAN_CODES } from "@/lib/paystack-plans";
import { toast } from "sonner";
import { useImperativeHandle, forwardRef } from "react";
import { useRouter } from "next/navigation";

interface PaystackPaymentProviderProps {
  email: string;
  amount: number;
  currency: string;
  billingCycle: "monthly" | "yearly";
}

export interface PaystackPaymentHandle {
  initialize: () => void;
}

const PaystackPaymentProvider = forwardRef<
  PaystackPaymentHandle,
  PaystackPaymentProviderProps
>(({ email, amount, currency, billingCycle }, ref) => {
  const router = useRouter();

  const config = {
    reference: `ctech-${Date.now()}`,
    email: email,
    amount: amount * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY as string,
    currency: currency,
    plan: PLAN_CODES[currency][billingCycle],
  };

  const initializePayment = usePaystackPayment(config);

  useImperativeHandle(ref, () => ({
    initialize: () => {
      initializePayment({
        onSuccess: () => {
          toast.success("Welcome to Pro Scholar!");
          router.push("/dashboard");
        },
        onClose: () => {
          toast.info("Payment cancelled.");
        },
      });
    },
  }));

  return null; // This component doesn't render anything UI-wise
});

PaystackPaymentProvider.displayName = "PaystackPaymentProvider";

export default PaystackPaymentProvider;
