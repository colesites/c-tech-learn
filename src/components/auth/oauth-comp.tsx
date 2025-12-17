"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface OAuthCompProps extends React.ComponentProps<typeof Button> {
  provider: "google" | "github";
  icon: React.ReactNode;
  label?: string;
}

export function OAuthComp({
  provider,
  icon,
  label,
  className,
  ...props
}: OAuthCompProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border-white/10 bg-white/5 py-6 text-base font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-[0.98]",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="text-xl">{icon}</span>
      {label && <span>{label}</span>}
    </Button>
  );
}
