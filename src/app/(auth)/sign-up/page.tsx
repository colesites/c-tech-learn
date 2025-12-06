import { SignUpForm } from "@/components/auth/sign-up-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - C Tech Learn",
  description: "Create an account to start learning.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}