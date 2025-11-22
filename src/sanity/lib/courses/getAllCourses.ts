import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const ALL_COURSES_QUERY = defineQuery(`*[_type == "courses"] 
  | order(_createdAt desc) {
    _id,
    title,
    description,
    "slug": slug.current,
    image,
    price,
    introduction,
    curriculum
  }`);

export const getAllCourses = async () => {
  try {
    const courses = await sanityFetch({ query: ALL_COURSES_QUERY });
    return courses.data ?? [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};
