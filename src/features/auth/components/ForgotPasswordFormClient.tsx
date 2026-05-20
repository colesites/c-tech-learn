"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AuthInput } from "@/features/auth/components/AuthInput";
import { forgotPasswordSchema } from "@/schemas";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordFormClient() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: ForgotPasswordValues) {
    setIsLoading(true);

    const { error } = await authClient.requestPasswordReset({
      email: values.email,
      redirectTo: "/reset-password",
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(
        "Password reset email sent! Please check your email for the reset link."
      );
      reset();
    }

    setIsLoading(false);
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Forgot Password
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Enter your email to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AuthInput
          label="Email"
          type="email"
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-linear-to-r from-primary
            to-purple-600 text-base font-semibold text-white shadow-lg
            shadow-primary/25 transition-all duration-300 hover:scale-[1.02]
            hover:shadow-primary/40 active:scale-[0.98]"
        >
          {isLoading ? <Spinner /> : "Send Reset Link"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-primary hover:text-primary/80
            hover:underline underline-offset-4 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
