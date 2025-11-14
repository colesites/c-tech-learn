"use client";

import BlurText from "@/components/react-bits/BlurText";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RotatingText from "@/components/react-bits/RotatingText";
import { RainbowButton } from "@/components/magic-ui/rainbow-button";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiShadcnui,
  SiNodedotjs,
  SiTypescript,
  SiNextdotjs,
  SiClerk,
  SiAuth0,
  SiReactquery,
  SiZod,
  SiSanity,
  SiDrizzle,
  SiPrisma,
  SiFirebase,
  SiSupabase,
  SiMongodb,
  SiStripe,
  SiTrpc,
  SiSentry,
  SiEslint,
  SiGit,
  SiGithub,
  SiNgrok,
  SiVercel,
} from "react-icons/si";
import { LogoLoop } from "@/components/react-bits/LogoLoop";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

const techLogos = [
  { node: <SiHtml5 />, title: "HTML5", href: "https://html.com" },
  { node: <SiCss3 />, title: "CSS3", href: "https://css.com" },
  {
    node: <SiJavascript />,
    title: "JavaScript",
    href: "https://javascript.com",
  },
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  { node: <SiShadcnui />, title: "Shadcn UI", href: "https://ui.shadcn.com" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiClerk />, title: "Clerk", href: "https://clerk.com" },
  { node: <SiAuth0 />, title: "Auth0", href: "https://auth0.com" },
  {
    node: <SiReactquery />,
    title: "React Query",
    href: "https://react-query.tanstack.com",
  },
  { node: <SiZod />, title: "Zod", href: "https://zod.dev" },
  { node: <SiSanity />, title: "Sanity", href: "https://sanity.io" },
  { node: <SiDrizzle />, title: "Drizzle", href: "https://drizzle.dev" },
  { node: <SiPrisma />, title: "Prisma", href: "https://prisma.io" },
  {
    node: <SiFirebase />,
    title: "Firebase",
    href: "https://firebase.google.com",
  },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://mongodb.com" },
  { node: <SiStripe />, title: "Stripe", href: "https://stripe.com" },
  { node: <SiTrpc />, title: "TRPC", href: "https://trpc.io" },
  { node: <SiSentry />, title: "Sentry", href: "https://sentry.io" },
  { node: <SiEslint />, title: "ESLint", href: "https://eslint.org" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
  { node: <SiNgrok />, title: "Ngrok", href: "https://ngrok.com" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
];

const HeroSection = () => {
  useGSAP(() => {
    gsap.to(".hero-description, .hero-cta, .logo-loop", {
      opacity: 1,
      duration: 2,
      ease: "power2.inOut",
      delay: 1,
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <AnimatedGroup variants={transitionVariants}>
        <Link
          href="/all-courses"
          className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
        >
          <span className="text-foreground text-sm">
            Start Your Learning Journey
          </span>
          <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

          <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
            <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
              <span className="flex size-6">
                <ArrowRight className="m-auto size-3" />
              </span>
              <span className="flex size-6">
                <ArrowRight className="m-auto size-3" />
              </span>
            </div>
          </div>
        </Link>
      </AnimatedGroup>

      <div className="mx-auto w-full md:w-[min(90%,800px)]">
        <BlurText
          text="Your Gateway to Modern Web Development"
          delay={150}
          animateBy="words"
          direction="top"
          className="my-8 flex flex-wrap justify-center text-4xl font-bold md:text-6xl"
        />
      </div>

      <p className="hero-description opacity-0 mx-auto text-center font-medium text-[1.5rem] max-w-[300px] md:max-w-2xl md:text-xl">
        Build your tech journey with hands-on skills in{" "}
        <RotatingText
          texts={["Front-End", "Back-End", "Full-Stack"]}
          mainClassName="inline-flex overflow-hidden rounded-lg bg-primary px-2 py-0.5 text-black sm:px-2 sm:py-1 md:px-3 md:py-2"
          staggerFrom="last"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      </p>

      <div className="hero-cta opacity-0 flex gap-4 mt-8">
        <RainbowButton className="dark:text-black">Get Started</RainbowButton>
        <RainbowButton variant="outline">Sign In</RainbowButton>
      </div>

      <LogoLoop
        logos={techLogos}
        speed={20}
        direction="left"
        logoHeight={30}
        gap={40}
        scaleOnHover
        fadeOut
        fadeOutColorClass="background"
        ariaLabel="Technology partners"
        className="logo-loop opacity-0 absolute -bottom-24 left-0 md:max-w-4xl"
      />
    </div>
  );
};

export default HeroSection;
