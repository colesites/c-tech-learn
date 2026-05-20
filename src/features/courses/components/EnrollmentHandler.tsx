"use client";

import { useEffect } from "react";
import { enrollInCourse } from "@/app/actions/enrollment";

interface EnrollmentHandlerProps {
  email: string;
  courseId: string;
}

export function EnrollmentHandler({ email, courseId }: EnrollmentHandlerProps) {
  useEffect(() => {
    // Automatically enroll when visiting the course page
    const performEnrollment = async () => {
      await enrollInCourse(email, courseId);
    };
    
    performEnrollment();
  }, [email, courseId]);

  return null;
}
