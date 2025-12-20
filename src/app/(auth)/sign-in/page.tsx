import { SignInFormClient } from "@/features/auth/components/SignInFormClient";
import type { Metadata } from "next";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account.",
};

export default async function SignInPage() {
  const session = await getSession();

  if (session) {
    redirect("/all-courses");
  }

  return (
    <>
      <SignInFormClient />
    </>
  );
}
