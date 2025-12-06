"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function BackButton({ children, className, ...props }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={cn(
        "inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors group z-20 relative cursor-pointer",
        className
      )}
      {...props}
    >
      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span className="font-medium">{children || "Back"}</span>
    </button>
  );
}
