export const PLAN_CODES: Record<string, Record<string, string>> = {
  NGN: {
    monthly: process.env.NEXT_PUBLIC_PAYSTACK_PLAN_MONTHLY_NGN || "",
    yearly: process.env.NEXT_PUBLIC_PAYSTACK_PLAN_YEARLY_NGN || "",
  },
  USD: {
    monthly: process.env.NEXT_PUBLIC_PAYSTACK_PLAN_MONTHLY_USD || "",
    yearly: process.env.NEXT_PUBLIC_PAYSTACK_PLAN_YEARLY_USD || "",
  },
};
