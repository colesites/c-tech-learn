import { getLatestCoursesQuery } from "@/sanity/lib/courses/getLatestCourses";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import { CoursesSectionSkeleton } from "@/components/loader/CoursesSectionSkeleton";
import { AnimatedCoursesGrid } from "@/components/AnimatedCoursesGrid";
import { AnimatedSectionHeader } from "@/components/AnimatedSectionHeader";
import { AnimatedViewAllButton } from "@/components/AnimatedViewAllButton";

async function CoursesList() {
  "use cache";
  cacheLife("seconds");

  const latestCourses = await getLatestCoursesQuery();

  return <AnimatedCoursesGrid courses={latestCourses} />;
}

const CoursesSection = () => {
  return (
    <div className="py-24 relative" id="courses">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedSectionHeader
          title="Latest Courses"
          subtitle="Explore our most recent courses."
        />

        <Suspense fallback={<CoursesSectionSkeleton />}>
          <CoursesList />
        </Suspense>

        <AnimatedViewAllButton />
      </div>
    </div>
  );
};

export default CoursesSection;
