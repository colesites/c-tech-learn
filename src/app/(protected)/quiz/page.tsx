import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { AnimatedDashboardHome } from "@/features/dashboard/components/AnimatedDashboardHome";
import { Badge } from "@/components/ui/badge";
import { Trophy, ArrowRight, Timer, HelpCircle } from "lucide-react";

export default async function Quiz() {
  const session = await getSession();
  if (!session) redirect("/sign-in?callbackUrl=/quiz");
  if (session.user.role !== "PRO") redirect("/#pricing");

  // Sample data for quizzes
  const quizzes = [
    {
      title: "React Fundamentals",
      questions: 15,
      time: "20 min",
      category: "React",
    },
    {
      title: "Next.js 15 Deep Dive",
      questions: 20,
      time: "30 min",
      category: "Next.js",
    },
    {
      title: "TypeScript Advanced Patterns",
      questions: 12,
      time: "25 min",
      category: "TypeScript",
    },
    {
      title: "Prisma & Database Design",
      questions: 10,
      time: "15 min",
      category: "Database",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Quizzes
        </h1>
        <p className="text-muted-foreground text-lg">
          Test your knowledge and earn certificates to showcase on your profile.
        </p>
      </div>

      <AnimatedDashboardHome>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizzes.map((quiz, i) => (
            <div
              key={i}
              className="course-home-card group rounded-2xl border border-border/80 bg-card p-6 transition-[border-color,background-color,box-shadow,transform] duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-primary/20"
            >
              <div className="size-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <Trophy className="size-6" />
              </div>
              <Badge
                variant="outline"
                className="mb-2 text-[10px] font-bold uppercase tracking-wider text-primary border-primary/20 bg-primary/5"
              >
                {quiz.category}
              </Badge>
              <h3 className="text-lg font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                {quiz.title}
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-xs text-foreground/70 font-medium">
                  <HelpCircle className="size-3.5" />
                  <span>{quiz.questions} Questions</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground/70 font-medium">
                  <Timer className="size-3.5" />
                  <span>{quiz.time}</span>
                </div>
              </div>

              <button className="w-full rounded-xl bg-primary/10 py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground border border-primary/20">
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </AnimatedDashboardHome>
    </div>
  );
}
