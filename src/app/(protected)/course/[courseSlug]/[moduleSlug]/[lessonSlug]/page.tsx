import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getLessonBySlug } from "@/sanity/lib/courses/getLessonBySlug";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import LessonPriceComp from "@/features/homepage/components/LessonPriceComp";
import { getCoursesBySlug } from "@/sanity/lib/courses/getCoursesBySlug";

export default async function LessonPage({
  params,
}: {
  params: Promise<{
    lessonSlug: string;
    courseSlug: string;
  }>;
}) {
  const { lessonSlug } = await params;
  const session = await getSession();

  if (!session) redirect("/sign-in?callbackUrl=/?payment=pro%23pricing");

  const lesson = await getLessonBySlug(lessonSlug);
  if (!lesson) notFound();

  const course = await getCoursesBySlug((await params).courseSlug);

  if (session.user.role !== "PRO" && !lesson.isFree)
    return (
      <MaxWidthWrapper>
        <div className="min-h-screen bg-background relative overflow-hidden pt-10 pb-24">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold">{lesson.title}</h2>
            <h2 className="text-5xl font-bold pt-20 text-center">
              The rest of this lesson is waiting.
              <br />
              <span className="text-primary">
                Join C Tech Learn PRO to access this lesson.
              </span>
            </h2>

            <LessonPriceComp
              coursePlan={{
                slug: course.slug.current,
                title: course.title,
                price: course.price,
              }}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    );

  return (
    <MaxWidthWrapper>
      <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24">
        <div key={lesson.slug.current} className="mb-10">
          <h2 className="text-4xl font-bold">{lesson.title}</h2>
        </div>

        <PortableText value={lesson.content} />
      </div>
    </MaxWidthWrapper>
  );
}
