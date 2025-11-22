import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

// 1. Define the query once at the module level
export const LATEST_COURSES_QUERY = defineQuery(`
  *[_type == "courses"] | order(_createdAt desc)[0...3]{
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
  }
`);

export const getLatestCourses = async () => {
  try {
    // 2. sanityFetch returns an object with { data }, so we destructure it
    const { data } = await sanityFetch({
      // if you have a TS type, you can do:
      // const { data } = await sanityFetch<Course[]>({
      query: LATEST_COURSES_QUERY,
    });

    // 3. Always return an array
    return data ?? [];
  } catch (error) {
    console.error("Error fetching latest courses:", error);
    return [];
  }
};
