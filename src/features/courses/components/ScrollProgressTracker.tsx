"use client";

import { useEffect, useRef, useState } from "react";
import { updateLessonProgress } from "@/app/actions/enrollment";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface ScrollProgressTrackerProps {
  email: string;
  courseId: string;
  lessonId: string;
  totalLessons: number;
}

export function ScrollProgressTracker({ email, courseId, lessonId, totalLessons }: ScrollProgressTrackerProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const updatedRef = useRef(false);

  useEffect(() => {
    const handleScroll = async () => {
      if (updatedRef.current) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Check if user has scrolled to the bottom (with some margin)
      // or if the content is small enough to fit in 100vh
      const isAtBottom = scrollTop + windowHeight >= documentHeight - 50;
      const isFullPageHeight = documentHeight <= windowHeight + 10;

      if (isAtBottom || isFullPageHeight) {
        updatedRef.current = true;
        setIsCompleted(true);
        toast.success("Lesson completed!", {
          description: "Your progress has been saved.",
        });
        await updateLessonProgress(email, courseId, lessonId, totalLessons);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check for short pages
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [email, courseId, lessonId, totalLessons]);

  return (
    <AnimatePresence>
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="bg-primary/90 backdrop-blur-md text-primary-foreground px-6 py-3 rounded-full shadow-2xl shadow-primary/30 flex items-center gap-2 border border-white/10">
            <CheckCircle2 className="size-5" />
            <span className="font-semibold tracking-tight">Lesson Completed!</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
