import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import type { BlockContent } from "../../../../sanity.types";

export type Blog = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: { current: string };
  description: string;
  readMinutes?: number;
  featuredImage?: {
    alt?: string;
    asset?: {
      _id: string;
      url: string;
    };
  };
  category?: {
    title: string;
    slug: { current: string };
  };
  author?: {
    _id: string;
    name?: string;
    slug?: { current: string };
    image?: {
      asset?: {
        _id: string;
        url: string;
      };
    };
  };
  content: BlockContent;
};

const BLOG_FIELDS = `{
  _id,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug{current},
  description,
  readMinutes,
  featuredImage{
    alt,
    asset->{
      _id,
      url
    }
  },
  category->{
    title,
    "slug": slug{current}
  },
  author->{
    _id,
    name,
    "slug": slug{current},
    image{
      asset->{
        _id,
        url
      }
    }
  },
  content
}`;

const ALL_BLOGS_QUERY = defineQuery(
  `*[_type == "blog"] | order(_createdAt desc) ${BLOG_FIELDS}`
);

const BLOG_BY_SLUG_QUERY = defineQuery(
  `*[_type == "blog" && slug.current == $slug][0] ${BLOG_FIELDS}`
);

const ALL_BLOG_SLUGS_QUERY = defineQuery(
  `*[_type == "blog"]{ "slug": slug{current} }`
);

const BLOG_CARDS_QUERY = defineQuery(`
  *[_type == "blog"] | order(_createdAt desc){
    _id,
    _createdAt,
    title,
    "slug": slug{current},
    description,
    readMinutes,
    featuredImage{
      alt,
      asset->{
        _id,
        url
      }
    },
    category->{
      title,
      "slug": slug{current}
    },
    author->{
      name,
      image{
        asset->{
          _id,
          url
        }
      }
    }
  }
`);

export type BlogCard = Pick<
  Blog,
  | "_id"
  | "title"
  | "slug"
  | "description"
  | "_createdAt"
  | "featuredImage"
  | "category"
  | "author"
> & { readMinutes?: number };

export async function getAllBlogs(): Promise<Blog[]> {
  const { data } = await sanityFetch({ query: ALL_BLOGS_QUERY });
  return data as Blog[];
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const { data } = await sanityFetch({
    query: BLOG_BY_SLUG_QUERY,
    params: { slug },
  });
  return data as Blog | null;
}

export async function getAllBlogSlugs(): Promise<
  { slug: { current: string } }[]
> {
  const { data } = await sanityFetch({ query: ALL_BLOG_SLUGS_QUERY });
  return data as { slug: { current: string } }[];
}

export async function getBlogCards(): Promise<BlogCard[]> {
  const { data } = await sanityFetch({ query: BLOG_CARDS_QUERY });
  return data as BlogCard[];
}
