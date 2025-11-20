"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionHeaderProps {
  title: string;
  subtitle: string;
}

export function AnimatedSectionHeader({ title, subtitle }: AnimatedSectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        containerRef.current.children,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="mb-16 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl opacity-0 translate-y-8">
        {title}
      </h2>
      <p className="mt-4 text-lg text-muted-foreground opacity-0 translate-y-8">
        {subtitle}
      </p>
    </div>
  );
}

