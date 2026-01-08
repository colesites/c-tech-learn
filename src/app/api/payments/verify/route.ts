import { NextResponse } from "next/server";
import { paystack } from "@/lib/paystack";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json({ error: "Reference is required" }, { status: 400 });
    }

    // Verify transaction with Paystack
    const response = await paystack.transactions.verify(reference);

    if (response.status && response.data.status === "success") {
      const email = response.data.customer.email;

      // Update user role to PRO
      await prisma.user.update({
        where: { email },
        data: { role: "PRO" },
      });

      return NextResponse.json({ success: true, message: "Subscription activated" });
    }

    return NextResponse.json({ error: "Transaction verification failed" }, { status: 400 });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
