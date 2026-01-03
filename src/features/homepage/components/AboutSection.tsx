"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import BlurText from "@/components/react-bits/BlurText";
import RotatingText from "@/components/react-bits/RotatingText";
import { CheckCircle2, Sparkles } from "lucide-react";
import { stats, keyPoints } from "@/features/homepage/data";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      timeline
        .from(".about-left", {
          opacity: 0,
          x: -80,
          duration: 1.2,
          ease: "power3.out",
        })
        .from(
          ".about-right",
          {
            opacity: 0,
            x: 80,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".about-key-point",
          {
            opacity: 0,
            x: 40,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="about" ref={sectionRef} className="py-24 sm:py-32">
      <div className="relative overflow-hidden rounded-[32px] border border-border/60 bg-gradient-to-b from-primary/5 via-background to-background px-6 py-14 sm:px-10">
        <div
          className="pointer-events-none absolute inset-x-0 -top-24 h-64 bg-primary/20 blur-[120px]"
          aria-hidden="true"
        />
        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="about-left space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary backdrop-blur">
              <Sparkles className="size-4" />
              About C-Tech Learn
            </div>

            <div className="space-y-4 text-balance">
              <BlurText
                text="C-Tech Learn keeps web development simple, practical, and made for everyday Nigerians."
                className="text-3xl font-semibold leading-tight md:text-4xl"
                animateBy="words"
                delay={120}
              />
              <p className="text-base text-muted-foreground md:text-lg">
                C-Tech Learn is Nigeria’s modern learning lab for web
                development—built to make growth feel doable for students, job
                switchers, and working professionals. Learn on your own schedule
                with structured paths, interactive sandboxes, and offline kits
                that sync whenever you reconnect.
              </p>
              <p className="text-base text-muted-foreground md:text-lg">
                We&apos;re not just another tutorial site. We mix story-led
                explanations, community accountability, and live practice rooms
                so you move from watching to building instantly.
              </p>
            </div>

            <div className="rounded-3xl border border-primary/30 bg-background/90 p-6 shadow-xl shadow-primary/10 backdrop-blur">
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                <div className="relative inline-flex rounded-full border border-primary/40 bg-primary/5 px-5 py-2 text-[0.75rem] tracking-[0.5em] text-primary/90">
                  <span className="opacity-90">BUILD • PRACTICE • LAUNCH</span>
                  <span
                    className="absolute inset-0 rounded-full border border-white/10"
                    aria-hidden="true"
                  />
                </div>
                <RotatingText
                  texts={[
                    "Learn anywhere",
                    "Build with community",
                    "Launch to the world",
                  ]}
                  mainClassName="text-primary/90"
                  splitLevelClassName="text-[0.85rem]"
                  elementLevelClassName="px-0.5"
                  rotationInterval={2600}
                  staggerDuration={0.02}
                />
              </div>
              <p className="mt-5 text-lg font-medium text-foreground">
                Our mission is simple: equip Nigerians with the skills,
                confidence, and community needed to thrive in today&apos;s
                digital world—while welcoming learners everywhere who believe in
                building from Africa.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/70 bg-background/95 p-5 text-center shadow-inner shadow-primary/5"
                >
                  <p className="text-2xl font-semibold md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-right space-y-6">
            <div className="rounded-[24px] border border-primary/20 bg-primary/5 p-6 text-balance shadow-lg shadow-primary/20">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                Why it matters
              </p>
              <p className="mt-4 text-lg text-foreground">
                Learn at your pace—online or offline—with Nigeria-focused
                guidance, workshops streamed nationwide, and communities that
                stretch across the globe.
              </p>
            </div>

            <div className="rounded-[24px] border border-border/60 bg-background/90 p-6 shadow-xl shadow-primary/10 backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-lg font-semibold text-foreground">
                  Key Points
                </p>
                <RotatingText
                  texts={[
                    "Learn anywhere",
                    "Practice daily",
                    "Launch confidently",
                  ]}
                  mainClassName="text-sm font-semibold uppercase tracking-[0.35em] text-primary"
                  splitLevelClassName="px-0.5"
                  elementLevelClassName="text-primary"
                  rotationInterval={2200}
                  staggerDuration={0.015}
                />
              </div>
              <ul className="mt-6 space-y-5">
                {keyPoints.map((point) => (
                  <li key={point.title} className="about-key-point flex gap-4">
                    <div className="mt-1 flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary aspect-square">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold">{point.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {point.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
