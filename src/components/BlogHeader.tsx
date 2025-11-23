"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BlogHeader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=100",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(badgeRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          titleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          subtitleRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12"
    >
      <div ref={badgeRef} className="mb-6">
        <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide">
          Our Blogs
        </span>
      </div>

      <h2
        ref={titleRef}
        className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight"
      >
        Discover the latest{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          tech trends
        </span>{" "}
        and news
      </h2>

      <p
        ref={subtitleRef}
        className="text-lg text-muted-foreground leading-relaxed"
      >
        Dive into the cutting edge of technology with our curated articles,
        expert insights, and forward-thinking analyses designed to empower your
        digital journey.
      </p>
    </div>
  );
};

export default BlogHeader;
