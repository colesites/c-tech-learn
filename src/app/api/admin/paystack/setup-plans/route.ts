import { NextResponse } from "next/server";
import { paystack } from "@/lib/paystack";

export async function GET() {
  if (!process.env.PAYSTACK_SECRET_KEY) {
    return NextResponse.json(
      { success: false, message: "PAYSTACK_SECRET_KEY is missing in .env" },
      { status: 500 }
    );
  }
  try {
    const plansToCreate = [
      {
        name: "Pro Monthly (NGN)",
        interval: "monthly" as const,
        amount: 4000 * 100, // 4,000 NGN in kobo
        currency: "NGN",
        description: "Monthly subscription to C-Tech Learn Pro (NGN)",
      },
      {
        name: "Pro Yearly (NGN)",
        interval: "annually" as const,
        amount: 28000 * 100, // 28,000 NGN in kobo
        currency: "NGN",
        description: "Yearly subscription to C-Tech Learn Pro (NGN)",
      },
      {
        name: "Pro Monthly (USD)",
        interval: "monthly" as const,
        amount: 5 * 100, // 5 USD in cents
        currency: "USD",
        description: "Monthly subscription to C-Tech Learn Pro (USD)",
      },
      {
        name: "Pro Yearly (USD)",
        interval: "annually" as const,
        amount: 36 * 100, // 36 USD in cents
        currency: "USD",
        description: "Yearly subscription to C-Tech Learn Pro (USD)",
      },
    ];

    const results = [];

    for (const plan of plansToCreate) {
      try {
        const response = await paystack.plans.create(plan);
        results.push({
          name: plan.name,
          plan_code: response.data.plan_code,
          status: "created",
        });
      } catch (error: any) {
        results.push({
          name: plan.name,
          status: "error",
          message: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Plan setup process completed",
      plans: results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
