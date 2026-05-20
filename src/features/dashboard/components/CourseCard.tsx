"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: any;
  progress?: number;
  className?: string;
}

export function CourseCard({ course, progress = 0, className }: CourseCardProps) {
  const imageUrl = course.image ? urlFor(course.image).width(400).height(225).fit("crop").url() : null;

  return (
    <Link 
      href={`/course/${course.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-[border-color,background-color,box-shadow,transform] duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 h-full",
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted/20">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/10">
            <BookOpen className="size-10 text-muted-foreground/20" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider text-primary border-primary/20 bg-primary/5">
            {course.category || "Development"}
          </Badge>
        </div>
        <h3 className="mb-2 text-xl font-bold tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
          {course.description}
        </p>

        {/* Progress Section */}
        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-muted-foreground flex items-center gap-1.5 font-semibold">
              <Clock className="size-3" /> 
              {progress}% Completed
            </span>
          </div>
          <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(var(--primary),0.5)]" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
           <div className="text-sm font-bold text-primary flex items-center gap-2 transition-all group/btn">
             Continue Learning 
             <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
               <ArrowRight className="size-3" />
             </div>
           </div>
        </div>
      </div>
    </Link>
  );
}
