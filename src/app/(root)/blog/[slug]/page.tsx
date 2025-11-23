import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from "lucide-react";
import { getBlogBySlug } from "@/sanity/lib/blogs/getBlog";
import { urlFor } from "@/sanity/lib/image";
import PortableText from "@/components/PortableText";
import { cacheLife } from "next/cache";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPage({ params }: Props) {
  "use cache";
  cacheLife("days");

  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[500px] flex items-end">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {blog.featuredImage?.asset && (
            <>
              <Image
                src={urlFor(blog.featuredImage).url()}
                alt={blog.featuredImage.alt || blog.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
              <div className="absolute inset-0 bg-black/20" />
            </>
          )}
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Blogs</span>
          </Link>

          <div className="max-w-4xl">
            {blog.category && (
              <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold tracking-wide shadow-lg shadow-primary/20">
                {blog.category.title}
              </span>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight shadow-black/10 drop-shadow-sm">
              {blog.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              {blog.author && (
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/20 bg-white/10">
                    {blog.author.image?.asset ? (
                      <Image
                        src={urlFor(blog.author.image).url()}
                        alt={blog.author.name || "Author"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">
                      {blog.author.name}
                    </span>
                    <span className="text-xs opacity-80 uppercase tracking-wider">
                      Author
                    </span>
                  </div>
                </div>
              )}

              <div className="h-8 w-px bg-white/20 hidden sm:block" />

              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-foreground" />
                <span className="font-medium">
                  {format(new Date(blog._createdAt), "MMMM d, yyyy")}
                </span>
              </div>

              {blog.readMinutes && (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                  <Clock className="w-5 h-5 text-primary-foreground" />
                  <span className="font-medium">
                    {blog.readMinutes} min read
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="max-w-3xl mx-auto">
          {/* Description/Lead */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-xl mb-12">
            <p className="text-xl md:text-2xl font-medium text-card-foreground leading-relaxed italic opacity-90">
              {blog.description}
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-background">
            <PortableText value={blog.content} />
          </div>

          {/* Footer/Share (Optional placeholder) */}
          <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
            <p className="text-muted-foreground font-medium">
              Thanks for reading!
            </p>
            <Link
              href="/blog"
              className="text-primary hover:text-accent font-semibold inline-flex items-center gap-2 transition-colors"
            >
              View more articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
