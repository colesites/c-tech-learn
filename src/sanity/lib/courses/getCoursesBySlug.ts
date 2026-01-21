import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const GET_COURSES_BY_SLUG_QUERY =
  defineQuery(`*[_type == "courses" && slug.current == $slug][0] {
  _id,
  title,
  description,
  "slug": slug.current,
  image,
  price,
  introduction,
  curriculum[] {
    title,
    slug,
    number,
    lessons[]->{
      title,
      slug,
      isFree,
      content
    }
  }
}`);

export const getCoursesBySlug = async (slug: string) => {
  try {
    const courses = await sanityFetch({
      query: GET_COURSES_BY_SLUG_QUERY,
      params: { slug },
    });
    return courses.data ?? [];
  } catch (error) {
    console.error("Error fetching course by slug:", error);
    return [];
  }
};
