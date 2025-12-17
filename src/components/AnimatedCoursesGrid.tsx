"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { GlowingEffect } from "@/components/aceternity-ui/glowing-effect";
import { LATEST_COURSES_QUERYResult } from "../../sanity.types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCoursesGridProps {
  courses: LATEST_COURSES_QUERYResult;
}

export function AnimatedCoursesGrid({ courses }: AnimatedCoursesGridProps) {
  const containerRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const cards = containerRef.current?.querySelectorAll(".course-card");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        {
          y: 50,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.2)",
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

  return (
    <ul
      ref={containerRef}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      {courses.map((course) => (
        <li
          key={course._id}
          className="course-card relative min-h-[14rem] list-none opacity-0 will-change-transform"
        >
          <Link href={`/course/${course.slug}`} className="block h-full group">
            <div className="relative h-full overflow-hidden rounded-[1.25rem] border-[0.75px] border-border p-2 dark:border-zinc-800 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={80}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6 bg-background/80 backdrop-blur-sm">
                <div className="relative flex flex-1 flex-col justify-between gap-3">
                  <div className="w-[120px] rounded-lg border border-border p-2 bg-background/50 transition-transform duration-300 group-hover:scale-105">
                    {course.image && (
                      <Image
                        src={urlFor(course.image).width(200).height(200).url()}
                        alt={course.title || ""}
                        width={200}
                        height={200}
                        className="size-full rounded-lg object-cover"
                        placeholder={
                          course.image?.asset?.metadata?.lqip ? "blur" : "empty"
                        }
                        blurDataURL={course.image?.asset?.metadata?.lqip || ""}
                      />
                    )}
                  </div>
                  <div className="space-y-3">
                    <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-tight text-foreground md:text-2xl md:leading-[1.875rem] text-balance transition-colors duration-300 group-hover:text-primary">
                      {course.title}
                    </h3>
                    <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80">
                    Check it now
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
