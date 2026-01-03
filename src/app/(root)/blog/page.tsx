import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { getBlogCards } from "@/sanity/lib/blogs/getBlog";
import BlogGrid from "@/features/homepage/components/BlogGrid";
import { BlogSectionSkeleton } from "@/components/loader/BlogSectionSkeleton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function BlogPage() {
  return (
    <MaxWidthWrapper>
      <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide mb-4">
              The Blog
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Explore our latest{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                articles
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Insights, tutorials, and updates from the world of technology.
              Stay ahead of the curve with our expert analysis.
            </p>
          </div>

          {/* Content */}
          <Suspense fallback={<BlogSectionSkeleton />}>
            <BlogList />
          </Suspense>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

async function BlogList() {
  "use cache";
  cacheLife("days");

  const blogs = await getBlogCards();
  return <BlogGrid blogs={blogs} />;
}
