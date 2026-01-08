"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (session) {
      const user = session.user as any;
      if (user?.role === "PRO") {
        router.replace("/dashboard");
      } else {
        router.replace("/all-courses");
      }
    } else {
      // No session, redirect to sign-in
      router.replace("/sign-in");
    }
  }, [session, isPending, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="size-8" />
    </div>
  );
}
