"use client";

import { TestimonialsColumn } from "@/components/testimonials-columns";
import { testimonials } from "@/data";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const header = headerRef.current;

      if (header) {
        gsap.fromTo(
          header.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (container) {
        gsap.fromTo(
          container,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative py-20 md:py-24"
      id="testimonials"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={headerRef}
          className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 text-center mb-16"
        >
          <div className="flex justify-center opacity-0">
            <div className="rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-sm text-primary font-medium">
              Testimonials
            </div>
          </div>
          <h2 className="font-bold text-3xl tracking-tight lg:text-5xl text-foreground opacity-0">
            Loved by Developers & Designers
          </h2>
          <p className="text-lg text-muted-foreground opacity-0 max-w-xl">
            Join thousands of professionals who trust our platform to master
            their craft and advance their careers.
          </p>
        </div>

        <div className="mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          <TestimonialsColumn duration={25} testimonials={firstColumn} />

          <TestimonialsColumn
            className="hidden md:block"
            duration={30}
            testimonials={secondColumn}
          />

          <TestimonialsColumn
            className="hidden lg:block"
            duration={28}
            testimonials={thirdColumn}
          />
        </div>
      </div>
    </div>
  );
}
