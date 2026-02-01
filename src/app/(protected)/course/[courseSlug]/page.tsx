import FAQSection from "@/features/homepage/components/FAQSection";
import { RainbowButton } from "@/components/magic-ui/rainbow-button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TestimonialsSection from "@/features/homepage/components/TestimonialsSection";
import { getCoursesBySlug } from "@/sanity/lib/courses/getCoursesBySlug";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import PortableText from "@/components/PortableText";
import CourseCurriculum from "@/components/CourseCurriculum";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const course = await getCoursesBySlug((await params).courseSlug);

  if (!course) {
    notFound();
  }

  return (
    <>
      <Header />
      <MaxWidthWrapper>
        <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24">
          <div className="flex items-center">
            <div className="w-1/2">
              <div className="flex flex-col gap-4">
                <h1 className="text-6xl font-bold">{course.title}</h1>
                <p className="text-lg text-muted-foreground">
                  {course.description}
                </p>
                <div className="flex gap-2">
                  <RainbowButton className="dark:text-black xl:text-xl h-12">
                    Start the Learning
                  </RainbowButton>
                  <RainbowButton
                    variant="outline"
                    className="xl:text-xl h-12"
                    asChild
                  >
                    <a href="#curriculum">Preview Lectures</a>
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
          <PortableText value={course.introduction} />
          <TestimonialsSection />
          <div
            id="curriculum"
            className="pt-24 md:pt-32 relative overflow-hidden"
          >
            <h2 className="font-bold text-3xl text-center tracking-tight lg:text-5xl text-foreground mb-10">
              The Complete{" "}
              <span className="text-primary">Course Curriculum</span>
            </h2>

            <div>
              <CourseCurriculum
                curriculum={course.curriculum}
                slug={(await params).courseSlug}
              />
            </div>
          </div>
          <FAQSection />
        </div>
      </MaxWidthWrapper>
      <Footer />
    </>
  );
}
