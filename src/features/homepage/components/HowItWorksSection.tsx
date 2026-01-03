"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { steps } from "@/features/homepage/data";

gsap.registerPlugin(ScrollTrigger);

const HowItWorksSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // Title Animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      });

      const items = gsap.utils.toArray<HTMLElement>(".work-item");

      items.forEach((item, i) => {
        const isEven = i % 2 === 0;

        gsap.fromTo(
          item,
          {
            x: isEven ? -200 : 200, // Coming from left or right
            opacity: 0,
            scale: 0.8,
            rotation: isEven ? -10 : 10,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.6)",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Connector Line Animation
      gsap.fromTo(
        ".connector-line",
        { height: 0 },
        {
          height: "100%",
          duration: 2,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative py-24 overflow-hidden"
      id="how-it-works"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            How C Tech Learn Works
          </h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border/50 -translate-x-1/2 md:transform-none">
            <div className="connector-line w-full bg-gradient-to-b from-primary/80 via-purple-500 to-blue-500 absolute top-0 left-0" />
          </div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={cn(
                    "work-item relative flex items-center gap-8 md:gap-12",
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* Icon Bubble */}
                  <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <div
                      className={cn(
                        "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-xl border-4 border-background",
                        step.color,
                        "text-white"
                      )}
                    >
                      <step.icon className="w-8 h-8 md:w-10 md:h-10" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={cn(
                      "flex-1",
                      isEven ? "text-left" : "md:text-right text-left"
                    )}
                  >
                    <div className="bg-card border border-border/50 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-zinc-900/50 backdrop-blur-sm">
                      <div
                        className={cn(
                          "flex items-center gap-3 mb-3",
                          isEven
                            ? "justify-start"
                            : "md:justify-end justify-start"
                        )}
                      >
                        <span className="flex items-center justify-center w-8 h-8 aspect-square rounded-full bg-primary/10 text-primary font-bold text-sm ring-1 ring-primary/20">
                          {index + 1}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for Desktop to balance the layout since Icon is now absolute */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
