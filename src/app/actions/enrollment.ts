"use server";

import { serverClient } from "@/sanity/lib/server-client";
import { defineQuery } from "next-sanity";
import { revalidatePath } from "next/cache";

const ENROLLMENT_BY_USER_COURSE_QUERY = defineQuery(`*[_type == "enrollment" && userEmail == $email && course._ref == $courseId][0]`);

export async function enrollInCourse(email: string, courseId: string) {
  try {
    // Check if already enrolled
    const existingEnrollment = await serverClient.fetch(ENROLLMENT_BY_USER_COURSE_QUERY, {
      email,
      courseId,
    });

    if (existingEnrollment) {
      return { success: true, enrollmentId: existingEnrollment._id };
    }

    // Create new enrollment
    const newEnrollment = await serverClient.create({
      _type: "enrollment",
      userEmail: email,
      course: {
        _type: "reference",
        _ref: courseId,
      },
      progress: 0,
      completedLessons: [],
      lastAccessedAt: new Date().toISOString(),
    });

    revalidatePath("/dashboard");
    return { success: true, enrollmentId: newEnrollment._id };
  } catch (error) {
    console.error("Error enrolling in course:", error);
    return { success: false, error: "Failed to enroll in course" };
  }
}

export async function updateLessonProgress(email: string, courseId: string, lessonId: string, totalLessons: number) {
  try {
    const enrollment = await serverClient.fetch(ENROLLMENT_BY_USER_COURSE_QUERY, {
      email,
      courseId,
    });

    if (!enrollment) {
      console.error("No enrollment found for progress update");
      return { success: false, error: "Enrollment not found" };
    }

    const completedLessons = enrollment.completedLessons || [];
    const lessonRef = { _type: "reference", _ref: lessonId };

    // Check if lesson is already completed
    if (completedLessons.some((ref: any) => ref._ref === lessonId)) {
      return { success: true };
    }

    const updatedCompletedLessons = [...completedLessons, lessonRef];
    const newProgress = Math.round((updatedCompletedLessons.length / totalLessons) * 100);

    await serverClient
      .patch(enrollment._id)
      .set({
        completedLessons: updatedCompletedLessons,
        progress: newProgress,
        lastAccessedAt: new Date().toISOString(),
      })
      .commit();

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating lesson progress:", error);
    return { success: false, error: "Failed to update progress" };
  }
}
