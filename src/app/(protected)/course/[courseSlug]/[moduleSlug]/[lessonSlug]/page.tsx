import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getLessonBySlug } from "@/sanity/lib/courses/getLessonBySlug";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

export default async function LessonPage({
  params,
}: {
  params: Promise<{
    lessonSlug: string;
  }>;
}) {
  const { lessonSlug } = await params;
  const lesson = await getLessonBySlug(lessonSlug);

  if (!lesson) {
    notFound();
  }

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
