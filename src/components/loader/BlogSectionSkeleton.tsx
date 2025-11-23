import { Skeleton } from "@/components/ui/skeleton";

export function BlogSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border"
        >
          {/* Image Container */}
          <div className="relative h-64 w-full">
            <Skeleton className="h-full w-full" />
            {/* Category Badge Skeleton */}
            <div className="absolute top-4 left-4 z-10">
              <Skeleton className="h-7 w-24 rounded-full bg-background/90 backdrop-blur-sm" />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow p-6">
            <div className="flex-grow">
              {/* Title Skeleton */}
              <div className="mb-3 space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>

              {/* Description Skeleton */}
              <div className="mb-6 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>

            {/* Author & Meta */}
            <div className="flex items-center gap-4 pt-6 border-t border-border mt-auto">
              {/* Author Image */}
              <Skeleton className="h-10 w-10 rounded-full shrink-0" />

              <div className="flex flex-col gap-2">
                {/* Author Name */}
                <Skeleton className="h-4 w-32" />
                {/* Date & Read Time */}
                <Skeleton className="h-3 w-24" />
              </div>

              <div className="ml-auto">
                {/* Arrow Button */}
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

