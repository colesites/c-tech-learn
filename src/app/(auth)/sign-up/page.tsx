import { getSession } from "@/lib/auth-server";
import { SignUpFormClient } from "@/components/auth/SignupFormClient";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account to start learning.",
};

export default async function SignUpPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <>
      <SignUpFormClient />
    </>
  );
}
