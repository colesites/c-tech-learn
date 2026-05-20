import { getUserEnrollments } from "@/sanity/lib/courses/getUserEnrollments";
import { CourseCard } from "./CourseCard";
import { AnimatedDashboardHome } from "./AnimatedDashboardHome";
import { BookOpen } from "lucide-react";
import Link from "next/link";

interface InProgressCoursesProps {
  email: string;
}

export async function InProgressCourses({ email }: InProgressCoursesProps) {
  const enrollments = await getUserEnrollments(email);
  const inProgress = enrollments.filter((e: any) => e.progress < 100);

  if (inProgress.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 flex flex-col items-center justify-center text-center space-y-4 bg-muted/5">
        <div className="size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          <BookOpen className="size-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">No courses in progress</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Browse our catalog to find your next course and start your
            learning journey.
          </p>
        </div>
        <Link href="/all-courses">
          <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all">
            Browse Courses
          </button>
        </Link>
      </div>
    );
  }

  return (
    <AnimatedDashboardHome>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {inProgress.map((enrollment: any) => (
          <CourseCard
            key={enrollment._id}
            course={enrollment.course}
            progress={enrollment.progress}
            className="course-home-card"
          />
        ))}
      </div>
    </AnimatedDashboardHome>
  );
}
