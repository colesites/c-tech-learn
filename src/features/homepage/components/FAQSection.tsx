"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { faqs } from "@/features/homepage/data";
import { Plus, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FAQItem = ({
  item,
  isOpen,
  onClick,
  index,
}: {
  item: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isOpen) {
        gsap.to(contentRef.current, {
          height: "auto",
          opacity: 1,
          marginTop: 16,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          marginTop: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    },
    { dependencies: [isOpen], scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className="border-b border-border last:border-none">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
      >
        <span className="text-lg md:text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
          {item.question}
        </span>
        <div className="relative flex items-center justify-center size-8 shrink-0 ml-4">
          {/* Plus Icon */}
          <span
            className={cn(
              "absolute transition-transform duration-300 ease-out",
              isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            )}
          >
            <Plus className="size-5 text-primary" />
          </span>
          {/* Minus Icon */}
          <span
            className={cn(
              "absolute transition-transform duration-300 ease-out",
              isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            )}
          >
            <Minus className="size-5 text-primary" />
          </span>
        </div>
      </button>
      <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
        <p className="pb-6 text-muted-foreground leading-relaxed text-base md:text-lg max-w-3xl">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".faq-item-anim");

      // Staggered entrance animation
      gsap.fromTo(
        items,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="py-24 md:py-32 relative overflow-hidden"
      ref={containerRef}
      id="faq"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
        <div className="text-center mb-16 space-y-4 faq-item-anim">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about the platform and how it works.
          </p>
        </div>

        <div className="w-full max-w-3xl mx-auto faq-item-anim">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              item={faq}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>

        <div className="mt-16 text-center faq-item-anim">
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-secondary/50 border border-border backdrop-blur-sm">
            <div className="px-6 py-2">
              <p className="text-muted-foreground text-sm md:text-base">
                Still have questions?{" "}
                <a
                  href="#contact"
                  className="text-primary font-semibold hover:underline decoration-primary/30 underline-offset-4 transition-all"
                >
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
