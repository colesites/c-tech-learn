import { MailCheck, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address.",
};

export default async function VerifyEmailPage() {
  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Icon Container */}
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-6 ring-8 ring-primary/5">
            <MailCheck className="h-12 w-12 text-primary" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Check your email
          </h1>
          <p className="text-balance text-lg text-muted-foreground">
            We've sent a verification link to your email address. Please click
            the link to activate your account.
          </p>
        </div>

        {/* Info Box */}
        <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground shadow-sm">
          <p>
            Don't see it? Check your <strong>spam folder</strong> or promotions
            tab.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-4 space-y-4">
          <Link
            href="/sign-in"
            className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
