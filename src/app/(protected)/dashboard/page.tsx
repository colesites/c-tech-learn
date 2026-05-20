import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { InProgressCourses } from "@/features/dashboard/components/InProgressCourses";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function InProgressSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-video w-full rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  return (
    <div className="space-y-10">
      <section>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">
            Welcome back,{" "}
            <span className="text-primary">
              {session.user.name?.split(" ")[0] || "Student"}
            </span>
            ! 👋
          </h1>
          <p className="text-muted-foreground">
            Keep up the great work and continue your learning journey.
          </p>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">In Progress</h2>
          <Link
            href="/all-courses"
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            View all courses
          </Link>
        </div>

        <Suspense fallback={<InProgressSkeleton />}>
          <InProgressCourses email={session.user.email!} />
        </Suspense>
      </section>

      <section className="rounded-3xl bg-primary/12 border border-primary/30 p-8 md:p-12 overflow-hidden relative">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Master New Skills Today
          </h2>
          <p className="text-muted-foreground mb-6 text-lg">
            Explore our latest learning paths and quizzes to test your knowledge
            and advance your career.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/learning-paths">
              <button className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                Explore Paths
              </button>
            </Link>
            <Link href="/quiz">
              <button className="rounded-full bg-background border border-border px-6 py-3 font-semibold transition-all hover:bg-accent active:scale-95">
                Take a Quiz
              </button>
            </Link>
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-10%] size-64 bg-primary/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-5%] size-48 bg-primary/10 blur-[80px] rounded-full" />
      </section>
    </div>
  );
}
