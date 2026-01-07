export const PAYSTACK_URL = "https://api.paystack.co";

export interface PaystackPlan {
  id: number;
  name: string;
  plan_code: string;
  description: string | null;
  amount: number;
  interval: string;
  currency: string;
}

export interface PaystackResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

/**
 * Server-side utility to interact with the Paystack API
 */
export async function paystackRequest<T>(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
): Promise<PaystackResponse<T>> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    throw new Error("PAYSTACK_SECRET_KEY is not defined in environment variables");
  }

  const response = await fetch(`${PAYSTACK_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Paystack API error: ${response.status}`);
  }

  return data;
}

export const paystack = {
  plans: {
    create: (params: {
      name: string;
      interval: "daily" | "weekly" | "monthly" | "quarterly" | "annually";
      amount: number; // in kobo or cents
      currency?: string;
      description?: string;
    }) => paystackRequest<PaystackPlan>("/plan", "POST", params),
    
    list: () => paystackRequest<PaystackPlan[]>("/plan", "GET"),
    
    fetch: (planCode: string) => paystackRequest<PaystackPlan>(`/plan/${planCode}`, "GET"),
  },
  transactions: {
    verify: (reference: string) => paystackRequest<any>(`/transaction/verify/${reference}`, "GET"),
  },
};
