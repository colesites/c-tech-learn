import { Skeleton } from "@/components/ui/skeleton";

export function CoursesSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="relative min-h-[14rem] h-full">
          <div className="relative h-full overflow-hidden rounded-[1.25rem] border-[0.75px] border-border p-2 dark:border-zinc-800">
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6 bg-background/80 backdrop-blur-sm">
              <div className="relative flex flex-1 flex-col justify-between gap-3">
                <div className="w-fit rounded-lg border border-border p-2 bg-background/50">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                </div>
                <div className="space-y-3 w-full">
                  <Skeleton className="h-7 w-3/4" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
