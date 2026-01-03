import type { Metadata } from "next";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { ForgotPasswordFormClient } from "@/features/auth/components/ForgotPasswordFormClient";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot your password? Reset it here.",
};

export default async function ForgotPasswordPage() {
  const session = await getSession();

  if (session) {
    redirect("/all-courses");
  }

  return (
    <>
      <ForgotPasswordFormClient />
    </>
  );
}
