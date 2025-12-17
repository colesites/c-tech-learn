import { SignInForm } from "./_components/SignInForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account.",
};

export default async function SignInPage() {
  return <SignInForm />;
}
