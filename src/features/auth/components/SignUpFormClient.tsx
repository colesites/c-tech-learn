"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AuthInput } from "@/features/auth/components/AuthInput";
import { OAuthButtons } from "@/features/auth/components/OAuthButtons";
import { signUpSchema } from "@/schemas";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type SignUpValues = z.infer<typeof signUpSchema>;

export function SignUpFormClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: SignUpValues) {
    setIsLoading(true);
    await authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password,
        callbackURL: "/callback",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          toast.success(
            "Account created successfully! Please check your email for verification."
          );
          setIsLoading(false);
          router.push("/verify-email");
          reset();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setIsLoading(false);
        },
      }
    );
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Create Account
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Join us and start your learning journey today.
        </p>
      </div>

      <OAuthButtons />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AuthInput
          label="Full Name"
          placeholder="John Doe"
          error={errors.name?.message}
          {...register("name")}
        />
        <AuthInput
          label="Email"
          type="email"
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <AuthInput
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-primary
            to-purple-600 text-base font-semibold text-white shadow-lg
            shadow-primary/25 transition-all duration-300 hover:scale-[1.02]
            hover:shadow-primary/40 active:scale-[0.98]"
        >
          {isLoading ? <Spinner /> : "Create Account"}
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
