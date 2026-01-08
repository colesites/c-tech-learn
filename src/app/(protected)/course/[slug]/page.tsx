import FAQSection from "@/features/homepage/components/FAQSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RainbowButton } from "@/components/magic-ui/rainbow-button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TestimonialsSection from "@/features/homepage/components/TestimonialsSection";
import { getCoursesBySlug } from "@/sanity/lib/courses/getCoursesBySlug";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/sign-in?callbackUrl=/?payment=pro%23pricing");
  if (session.user.role !== "PRO") redirect("/#pricing");

  const { slug } = await params;
  const course = await getCoursesBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
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
        <TestimonialsSection />
        <FAQSection />
      </div>
    </MaxWidthWrapper>
  );
}
