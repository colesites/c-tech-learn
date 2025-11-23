import { groq } from "next-sanity";
import { client } from "../client";
import { BlockContent } from "../../../../sanity.types";

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

const BLOG_FIELDS = groq`{
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

// All blogs, newest by created time
export async function getAllBlogs(): Promise<Blog[]> {
  const query = groq`*[_type == "blog"] | order(_createdAt desc) ${BLOG_FIELDS}`;
  return client.fetch<Blog[]>(query);
}

// Single blog by slug
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const query = groq`*[_type == "blog" && slug.current == $slug][0] ${BLOG_FIELDS}`;
  return client.fetch<Blog | null>(query, { slug });
}

// Lightweight list for cards (if you need it)
export async function getBlogCards(): Promise<
  Array<
    Pick<
      Blog,
      | "_id"
      | "title"
      | "slug"
      | "description"
      | "_createdAt"
      | "featuredImage"
      | "category"
      | "author"
    > & { readMinutes?: number }
  >
> {
  const query = groq`*[_type == "blog"] | order(_createdAt desc){
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
  }`;
  return client.fetch(query);
}
