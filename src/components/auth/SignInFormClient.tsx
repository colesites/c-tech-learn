"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { AuthInput } from "@/components/auth/auth-input";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schemas";
import { Spinner } from "@/components/ui/spinner";
import { OAuthButtons } from "@/components/auth/OAuthButtons";

type SignInValues = z.infer<typeof signInSchema>;

export function SignInFormClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: SignInValues) {
    setIsLoading(true);
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          toast.success("Signed in successfully!");
          router.push("/all-courses");
          setIsLoading(false);
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
          Welcome Back
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Sign in to continue your progress.
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

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AuthInput
          label="Email"
          type="email"
          placeholder="john@example.com"
          {...form.register("email")}
          error={form.formState.errors.email?.message}
        />
        <div className="space-y-1">
          <AuthInput
            label="Password"
            type="password"
            placeholder="••••••••"
            {...form.register("password")}
            error={form.formState.errors.password?.message}
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/40 active:scale-[0.98]"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Sign In"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-colors"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
