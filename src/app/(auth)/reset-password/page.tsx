import type { Metadata } from "next";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { ResetPasswordFormClient } from "@/features/auth/components/ResetPasswordFormClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password.",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    redirect("/");
  }

  const session = await getSession();

  if (session) {
    redirect("/all-courses");
  }

  return (
    <Suspense>
      <ResetPasswordFormClient />
    </Suspense>
  );
}
