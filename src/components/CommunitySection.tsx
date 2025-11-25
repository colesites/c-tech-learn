"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { communityLinks } from "@/data";

const CommunitySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const cards = cardsRef.current.filter((card) => card !== null);

      // Animation: Sequential Pop and Bounce
      // Replay on scroll: "play none none reverse" matches BlogSection behavior
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      cards.forEach((card, index) => {
        // Entrance: Scale up from 0 to 1.1 then back to 1
        tl.fromTo(
          card,
          { scale: 0, opacity: 0 },
          {
            scale: 1.1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          index * 0.2 // Stagger start times
        ).to(
          card,
          {
            scale: 1,
            duration: 0.2,
            ease: "power1.out",
          },
          ">" // Run immediately after the scale up
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="py-24" ref={containerRef}>
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Join our community
        </h2>
        <p className="text-muted-foreground text-lg">
          Connect with others, share experiences, and stay in the loop.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {communityLinks.map((link, index) => (
          <div
            key={link.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className={cn(
              "relative group rounded-2xl p-6 overflow-hidden border dark:border-white/10 border-primary/10", // Reduced padding to p-6
              "dark:hover:border-white/20 hover:border-primary/20 transition-colors duration-300",
              "aspect-[4/3] flex flex-col justify-between", // Landscape aspect ratio
              "dark:bg-black bg-white", // Black background
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
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{link.title}</h3>
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
        ))}
      </div>
    </div>
  );
};

export default CommunitySection;
