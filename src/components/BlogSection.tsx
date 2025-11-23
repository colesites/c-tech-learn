import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlogCards } from "@/sanity/lib/blogs/getBlog";
import BlogGrid from "./BlogGrid";
import BlogHeader from "./BlogHeader";
import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { BlogSectionSkeleton } from "./loader/BlogSectionSkeleton";

const BlogSection = async () => {
  "use cache";
  cacheLife("hours");

  const blogs = await getBlogCards();
  const displayedBlogs = blogs.slice(0, 3);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <BlogHeader />

        <Suspense fallback={<BlogSectionSkeleton />}>
          <BlogGrid blogs={displayedBlogs} />
        </Suspense>

        <div className="mt-12 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-card-foreground bg-card border border-border rounded-full hover:bg-accent hover:text-accent-foreground transition-colors duration-300 group"
          >
            View All Blogs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
