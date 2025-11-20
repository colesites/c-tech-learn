import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getLatestCoursesQuery = async () => {
  const LATEST_COURSES_QUERY =
    defineQuery(`*[_type == "courses"] | order(_createdAt desc)[0...3] {
    _id,
    title,
    description,
    "slug": slug.current,
    image {
      ...,
      asset->{
        ...,
        metadata {
          lqip
        }
      }
    }
  }`);

  try {
    const courses = await sanityFetch({ query: LATEST_COURSES_QUERY });
    return courses.data || [];
  } catch (error) {
    console.error("Error fetching latest courses:", error);
    return [];
  }
};
