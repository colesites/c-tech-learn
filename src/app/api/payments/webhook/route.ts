import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      console.error("PAYSTACK_SECRET_KEY is missing");
      return NextResponse.json({ error: "Configuration error" }, { status: 500 });
    }

    const signature = req.headers.get("x-paystack-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const body = await req.text();

    // Verify signature
    const hash = crypto
      .createHmac("sha512", secret)
      .update(body)
      .digest("hex");

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "charge.success") {
      const customerEmail = event.data.customer.email;

      // Update user role to PRO
      await prisma.user.update({
        where: { email: customerEmail },
        data: { role: "PRO" },
      });

      console.log(`Webhook: Updated user ${customerEmail} to PRO`);
      return NextResponse.json({ message: "Role updated" });
    }

    return NextResponse.json({ message: "Event ignored" });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
