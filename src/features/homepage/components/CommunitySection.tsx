"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { communityLinks } from "@/features/homepage/data";
import CommunityCard from "./CommunityCard";

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
    <div className="py-24" ref={containerRef} id="community">
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
          <CommunityCard
            key={link.id}
            link={link}
            index={index}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunitySection;
