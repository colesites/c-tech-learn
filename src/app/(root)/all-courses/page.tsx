import { AnimatedCoursesGrid } from "@/components/AnimatedCoursesGrid";
import { CoursesSectionSkeleton } from "@/components/loader/CoursesSectionSkeleton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getAllCourses } from "@/sanity/lib/courses/getAllCourses";
import { cacheLife } from "next/cache";
import { Suspense } from "react";

async function CoursesList() {
  "use cache";
  cacheLife("seconds");

  const allCourses = await getAllCourses();

  return <AnimatedCoursesGrid courses={allCourses} />;
}

export default async function AllCourses() {
  return (
    <MaxWidthWrapper>
      <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24">
        <Suspense fallback={<CoursesSectionSkeleton />}>
          <CoursesList />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
