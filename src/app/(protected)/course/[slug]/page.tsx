import React from "react";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RainbowButton } from "@/components/magic-ui/rainbow-button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TestimonialsSection from "@/components/TestimonialsSection";
import { getCoursesBySlug } from "@/sanity/lib/courses/getCoursesBySlug";
import { urlFor } from "@/sanity/lib/image";
import { cacheLife } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);

  return (
    <MaxWidthWrapper>
      <Header />
      <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24">
        <Suspense fallback={<div>Loading...</div>}>
          <CourseContent slug={slug} />
        </Suspense>
        <TestimonialsSection />
        <FAQSection />
      </div>
      <Footer />
    </MaxWidthWrapper>
  );
}

async function CourseContent({ slug }: { slug: string }) {
  "use cache";
  cacheLife("seconds");

  const course = await getCoursesBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex items-center">
      <div className="w-1/2">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-bold">{course.title}</h1>
          <p className="text-lg text-muted-foreground">{course.description}</p>
          <div className="flex gap-2">
            <RainbowButton className="dark:text-black xl:text-xl h-12">
              Start the Learning
            </RainbowButton>
            <RainbowButton variant="outline" className="xl:text-xl h-12">
              Preview Lectures
            </RainbowButton>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex justify-end">
        <Image
          src={urlFor(course.image).url()}
          alt={course.title || ""}
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
