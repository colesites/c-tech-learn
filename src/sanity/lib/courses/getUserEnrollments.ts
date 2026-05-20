import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const USER_ENROLLMENTS_QUERY = defineQuery(`*[_type == "enrollment" && userEmail == $email] {
  _id,
  progress,
  "course": course-> {
    _id,
    title,
    description,
    "slug": slug.current,
    image,
    category
  }
}`);

export const getUserEnrollments = async (email: string) => {
  try {
    const enrollments = await sanityFetch({ 
      query: USER_ENROLLMENTS_QUERY,
      params: { email } 
    });
    return enrollments.data ?? [];
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return [];
  }
};
