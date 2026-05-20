import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getLessonBySlug } from "@/sanity/lib/courses/getLessonBySlug";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import LessonPriceComp from "@/features/homepage/components/LessonPriceComp";
import { getCoursesBySlug } from "@/sanity/lib/courses/getCoursesBySlug";
import { ScrollProgressTracker } from "@/features/courses/components/ScrollProgressTracker";
import { EnrollmentHandler } from "@/features/courses/components/EnrollmentHandler";

export default async function LessonPage({
  params,
}: {
  params: Promise<{
    lessonSlug: string;
    courseSlug: string;
  }>;
}) {
  const { lessonSlug, courseSlug } = await params;

  const [session, lesson, course] = await Promise.all([
    getSession(),
    getLessonBySlug(lessonSlug),
    getCoursesBySlug(courseSlug),
  ]);

  if (!session) redirect("/sign-in?callbackUrl=/?payment=pro%23pricing");
  if (!lesson) notFound();

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

  const totalLessons =
    course.curriculum?.reduce(
      (acc: number, module: any) => acc + (module.lessons?.length || 0),
      0,
    ) || 1;

  return (
    <div className="w-full relative overflow-hidden pt-6 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
      {session.user.email && (
        <>
          <EnrollmentHandler email={session.user.email} courseId={course._id} />
          <ScrollProgressTracker
            email={session.user.email}
            courseId={course._id}
            lessonId={lesson._id}
            totalLessons={totalLessons}
          />
        </>
      )}
      <div key={lesson.slug.current} className="mb-10">
        <h2 className="text-4xl font-bold">{lesson.title}</h2>
      </div>

      <PortableText value={lesson.content} />
    </div>
  );
}
