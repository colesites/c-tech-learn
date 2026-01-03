"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
  FieldDescription,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RainbowButton } from "@/components/magic-ui/rainbow-button";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // Animation for the text content on the left
      gsap.fromTo(
        ".contact-text-anim",
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
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animation for the form on the right
      gsap.fromTo(
        formRef.current,
        {
          x: 50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      className="py-24 md:py-32 relative overflow-hidden"
      ref={containerRef}
      id="contact"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] opacity-50" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 -z-20 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Side: Text Content */}
          <div className="space-y-8 max-w-2xl">
            <div className="space-y-4 contact-text-anim">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                Let's <span className="text-primary">Debug</span> Your <br />
                Career Path Together
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Whether you're a student ready to launch your tech career, an
                instructor looking to share knowledge, or an enterprise seeking
                top talent, we're here to connect the dots.
              </p>
            </div>

            <div className="space-y-6 contact-text-anim">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/50 backdrop-blur-sm">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xl">🚀</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">
                    Launch Your Journey
                  </h3>
                  <p className="text-muted-foreground">
                    Get personalized guidance on which track suits your goals.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/50 backdrop-blur-sm">
                <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <span className="text-xl">🤝</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">
                    Partner With Us
                  </h3>
                  <p className="text-muted-foreground">
                    Collaborate on curriculum or hire our top graduates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="relative">
            {/* Decorative backdrop for form */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-blue-500/10 rounded-[2rem] blur-2xl -z-10" />

            <form
              ref={formRef}
              className="bg-background/80 dark:bg-card/30 backdrop-blur-xl border border-border rounded-[2rem] p-8 md:p-10 shadow-2xl"
              onSubmit={(e) => e.preventDefault()}
            >
              <FieldSet className="gap-8">
                <FieldLegend className="text-3xl font-bold text-foreground mb-2">
                  Get in touch
                </FieldLegend>
                <FieldDescription className="text-base mb-8">
                  Fill out the form below and our team will get back to you
                  within 24 hours.
                </FieldDescription>

                <FieldGroup>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field>
                      <FieldLabel htmlFor="first-name">First Name</FieldLabel>
                      <Input
                        id="first-name"
                        placeholder="Jane"
                        className="h-12 bg-secondary/50 border-border/50 focus:border-primary/50 transition-all"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
                      <Input
                        id="last-name"
                        placeholder="Doe"
                        className="h-12 bg-secondary/50 border-border/50 focus:border-primary/50 transition-all"
                      />
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      className="h-12 bg-secondary/50 border-border/50 focus:border-primary/50 transition-all"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="interest">
                      I'm interested in
                    </FieldLabel>
                    <Select>
                      <SelectTrigger
                        id="interest"
                        className="h-12 bg-secondary/50 border-border/50 focus:border-primary/50 transition-all w-full"
                      >
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student Support</SelectItem>
                        <SelectItem value="instructor">
                          Becoming an Instructor
                        </SelectItem>
                        <SelectItem value="business">
                          Business Partnership
                        </SelectItem>
                        <SelectItem value="technical">
                          Technical Issue
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="message">Message</FieldLabel>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help..."
                      className="min-h-[150px] resize-none bg-secondary/50 border-border/50 focus:border-primary/50 transition-all p-4"
                    />
                  </Field>

                  <RainbowButton
                    type="submit"
                    className="w-full h-12 text-lg mt-4 dark:text-black"
                  >
                    Send Message
                  </RainbowButton>
                </FieldGroup>
              </FieldSet>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
