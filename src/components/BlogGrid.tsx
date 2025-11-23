"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Blog } from "@/sanity/lib/blogs/getBlog";
import { urlFor } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger);

interface BlogGridProps {
  blogs: Array<
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
  >;
}

const BlogGrid = ({ blogs }: BlogGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".blog-card");

      gsap.fromTo(
        cards,
        {
          y: 100,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom-=100",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
    >
      {blogs.map((blog) => (
        <Link
          key={blog._id}
          href={`/blog/${blog.slug.current}`}
          className="blog-card group flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
        >
          {/* Image Container */}
          <div className="relative h-64 w-full overflow-hidden">
            {blog.featuredImage?.asset && (
              <Image
                src={urlFor(blog.featuredImage).url()}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            )}

            {/* Category Badge */}
            {blog.category && (
              <div className="absolute top-4 left-4 z-10">
                <span className="px-4 py-1.5 bg-background/90 backdrop-blur-sm text-xs font-semibold text-primary rounded-full uppercase tracking-wider shadow-sm border border-border">
                  {blog.category.title}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow p-6">
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {blog.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-3 mb-6 leading-relaxed">
                {blog.description}
              </p>
            </div>

            {/* Author & Meta */}
            <div className="flex items-center gap-4 pt-6 border-t border-border mt-auto">
              {blog.author?.image?.asset && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-background shrink-0">
                  <Image
                    src={blog.author.image.asset.url}
                    alt={blog.author.name || "Author"}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col">
                <span className="text-sm font-medium text-card-foreground">
                  {blog.author?.name || "Unknown Author"}
                </span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>
                    {format(new Date(blog._createdAt), "MMM d, yyyy")}
                  </span>
                  {blog.readMinutes && (
                    <>
                      <span>•</span>
                      <span>{blog.readMinutes} min read</span>
                    </>
                  )}
                </div>
              </div>

              <div className="ml-auto">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogGrid;
