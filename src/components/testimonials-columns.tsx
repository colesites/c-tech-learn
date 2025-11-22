"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP animation for the card edges (floating effect)
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const cards = containerRef.current?.querySelectorAll(".testimonial-card");
        if (!cards) return;

        cards.forEach((card) => {
          gsap.to(card, {
            y: "random(-8, 8)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: "random(0, 2)",
          });
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div 
      className={props.className} 
      ref={containerRef}
    >
      <div
        className="flex flex-col gap-6 pb-6 animate-marquee hover:[animation-play-state:paused]"
        style={{
          "--marquee-duration": `${props.duration || 10}s`,
        } as React.CSSProperties}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={`column-${index}`}>
              {props.testimonials.map(({ text, image, name, role }) => (
                <div
                  className="testimonial-card w-full max-w-xs rounded-3xl border bg-card p-8 shadow-lg dark:bg-card/20 dark:shadow-foreground/10 transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:scale-[1.02]"
                  key={name}
                >
                  <div className="text-foreground/90 leading-relaxed">{text}</div>
                  <div className="mt-6 flex items-center gap-3">
                    <img
                      alt={name}
                      className="h-12 w-12 rounded-full object-cover border-2 border-primary/10"
                      height={48}
                      src={image}
                      width={48}
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold leading-5 tracking-tight text-foreground">
                        {name}
                      </div>
                      <div className="text-sm leading-5 tracking-tight text-muted-foreground">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </div>
    </div>
  );
};
