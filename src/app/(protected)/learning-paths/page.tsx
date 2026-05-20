import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { AnimatedDashboardHome } from "@/features/dashboard/components/AnimatedDashboardHome";
import { Badge } from "@/components/ui/badge";
import { Map, ArrowRight } from "lucide-react";

export default async function LearningPaths() {
  const session = await getSession();
  if (!session) redirect("/sign-in?callbackUrl=/learning-paths");
  if (session.user.role !== "PRO") redirect("/#pricing");

  // Sample data for learning paths
  const paths = [
    {
      title: "Frontend Master",
      desc: "Master React, Next.js and Tailwind CSS",
      duration: "12 Weeks",
      level: "Intermediate",
    },
    {
      title: "Backend Guru",
      desc: "Deep dive into Node.js, Prisma and PostgreSQL",
      duration: "10 Weeks",
      level: "Advanced",
    },
    {
      title: "Fullstack Wizard",
      desc: "Build complete end-to-end applications",
      duration: "20 Weeks",
      level: "Expert",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Learning Paths
        </h1>
        <p className="text-muted-foreground text-lg">
          Curated paths to guide you from beginner to expert in modern web
          development.
        </p>
      </div>

      <AnimatedDashboardHome>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path, i) => (
            <div
              key={i}
              className="course-home-card group rounded-2xl border border-border/80 bg-card p-6 transition-[border-color,background-color,box-shadow,transform] duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-primary/20"
            >
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <Map className="size-6" />
              </div>
              <Badge
                variant="outline"
                className="mb-2 text-[10px] font-bold uppercase tracking-wider text-primary border-primary/20"
              >
                {path.level}
              </Badge>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {path.title}
              </h3>
              <p className="text-sm text-foreground/80 mb-6 line-clamp-2">
                {path.desc}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs font-medium text-muted-foreground">
                  {path.duration}
                </span>
                <button className="flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                  Start Path <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedDashboardHome>
    </div>
  );
}
