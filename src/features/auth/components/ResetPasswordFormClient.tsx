"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AuthInput } from "@/features/auth/components/AuthInput";
import { resetPasswordSchema } from "@/schemas";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordFormClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") as string;

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: ResetPasswordValues) {
    setIsLoading(true);

    const { error } = await authClient.resetPassword({
      newPassword: values.password,
      token,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset successfully.");
      router.push("/sign-in");
      reset();
    }

    setIsLoading(false);
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Reset Password
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Enter your new password to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AuthInput
          label="New Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />
        <AuthInput
          label="Confirm New Password"
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-linear-to-r from-primary
            to-purple-600 text-base font-semibold text-white shadow-lg
            shadow-primary/25 transition-all duration-300 hover:scale-[1.02]
            hover:shadow-primary/40 active:scale-[0.98]"
        >
          {isLoading ? <Spinner /> : "Update Password"}
        </Button>
      </form>
    </div>
  );
}
