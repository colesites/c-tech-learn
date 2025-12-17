import { SignUpForm } from "./_components/SignupForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account to start learning.",
};

export default async function SignUpPage() {
  return <SignUpForm />;
}
