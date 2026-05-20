"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function AnimatedDashboardHome({ children }: { children: React.ReactNode }) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = containerRef.current?.querySelectorAll(".course-home-card");
    if (!cards || cards.length === 0) return;

    gsap.from(cards, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out",
      delay: 0.1,
      clearProps: "opacity,y,scale",
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}
