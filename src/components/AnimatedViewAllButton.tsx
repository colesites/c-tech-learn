"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AnimatedViewAllButton() {
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!buttonRef.current) return;

      gsap.fromTo(
        buttonRef.current,
        {
          y: 20,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: buttonRef }
  );

  return (
    <div ref={buttonRef} className="mt-16 flex justify-center opacity-0">
      <Link
        href="/all-courses"
        className="group inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 hover:scale-105 hover:shadow-lg"
      >
        View All Courses
        <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

