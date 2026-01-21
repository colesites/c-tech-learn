import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const GET_LESSON_BY_SLUG_QUERY = defineQuery(`
  *[_type == "lesson" && slug.current == $slug][0]{
    title,
    slug,
    isFree,
    content
  }
`);

export const getLessonBySlug = async (slug: string) => {
    try {
        const lesson = await sanityFetch({
            query: GET_LESSON_BY_SLUG_QUERY,
            params: { slug },
        });

        return lesson.data ?? null;
    } catch (error) {
        console.error("Error fetching lesson by slug:", error);
        return null;
    }
};
