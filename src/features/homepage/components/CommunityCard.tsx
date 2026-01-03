"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommunityCardProps {
  link: {
    id: string;
    icon: string;
    title: string;
    description: string;
    href: string;
    action: string;
    shadow: string;
    glow: string;
  };
  index: number;
}

const CommunityCard = React.forwardRef<HTMLDivElement, CommunityCardProps>(
  ({ link, index }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative group rounded-2xl p-6 overflow-hidden border dark:border-white/10 border-primary/10", // Reduced padding to p-6
          "dark:hover:border-white/20 hover:border-primary/20 transition-colors duration-300",
          "aspect-[4/3] flex flex-col justify-between", // Landscape aspect ratio
          "dark:bg-black bg-white", // Black background
          "w-full max-w-md xl:max-w-none mx-auto xl:mx-0", // Constrain width on mobile/tablet, full width on desktop
          link.shadow
        )}
      >
        {/* Grid Pattern Overlay darkmode */}
        <div
          className="hidden dark:block absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Grid Pattern Overlay lightmode */}
        <div
          className="block dark:hidden absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, black 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Top Right Glow - Brand Color */}
        <div
          className={cn(
            "absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-40",
            link.glow
          )}
        />

        <div className="relative z-10">
          {/* Icon with Black Circle Background - Smaller size */}
          <div className="mb-4 inline-flex items-center justify-center p-2.5 rounded-full dark:bg-black bg-white border border-primary/10 dark:border-white/10 size-14">
            <Image
              src={link.icon}
              alt={link.title}
              width={20}
              height={20}
              className="size-10"
            />
          </div>

          {/* Smaller Text */}
          <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
            {link.title}
          </h3>
          <p className="text-black/80 dark:text-gray-400 text-base leading-relaxed">
            {link.description}
          </p>
        </div>

        <div className="relative z-10 mt-auto pt-4">
          <Link
            href={link.href}
            className="inline-flex items-center text-sm font-medium text-black dark:text-white hover:text-black/70 dark:hover:text-gray-200 transition-colors"
          >
            {link.action}
            <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    );
  }
);

CommunityCard.displayName = "CommunityCard";

export default CommunityCard;
