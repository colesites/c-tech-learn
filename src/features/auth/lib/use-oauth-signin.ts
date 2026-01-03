"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useCallback, useTransition } from "react";

type Provider = "google" | "github";

async function signInSocial(provider: Provider) {
  await authClient.signIn.social({
    provider,
    callbackURL: "/all-courses",
    fetchOptions: {
      onError: () => {
        toast.error("Internal server error");
      },
    },
  });
}

export function useOAuthSignIn() {
  const [googlePending, startGoogleTransition] = useTransition();
  const [githubPending, startGithubTransition] = useTransition();

  const signInGoogle = useCallback(() => {
    startGoogleTransition(() => {
      void signInSocial("google");
    });
  }, []);

  const signInGithub = useCallback(() => {
    startGithubTransition(() => {
      void signInSocial("github");
    });
  }, []);

  return { googlePending, githubPending, signInGoogle, signInGithub };
}
