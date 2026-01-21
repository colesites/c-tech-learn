import {
  PortableText as PortableTextComponent,
  PortableTextComponents,
} from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import CopyButton from "./CopyButton";
import { highlight } from "@/lib/highlight";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-12 mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-5">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-semibold text-foreground mt-6 mb-3">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base md:text-lg font-semibold text-foreground mt-4 mb-2">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-sm md:text-base font-semibold text-foreground mt-2 mb-1">
        {children}
      </h6>
    ),
    normal: ({ children }) => (
      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-foreground bg-secondary/30 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          className="text-primary hover:text-accent underline decoration-2 underline-offset-2 transition-colors wrap-break-word"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground">{children}</em>
    ),
    u: ({ children }) => (
      <u className="underline text-foreground">{children}</u>
    ),
    code: ({ children }) => (
      <code className="bg-muted/10 px-1 py-0.5 rounded text-sm text-foreground">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-muted-foreground marker:text-primary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg text-muted-foreground marker:text-primary">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="wrap-break-word">{children}</li>,
    number: ({ children }) => <li className="wrap-break-word">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-10 relative w-full rounded-2xl overflow-hidden shadow-lg border border-border bg-card">
          <div className="relative aspect-video w-full">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || "Blog image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          {value.alt && (
            <div className="p-3 text-center text-sm text-muted-foreground bg-secondary/50 border-t border-border">
              {value.alt}
            </div>
          )}
        </div>
      );
    },
    divider: () => <hr className="my-10 border-t border-border" />,
    code: async ({ value }) => {
      const language = value.language || "text";
      const html = await highlight(value.code, language);

      return (
        <div className="my-10 rounded-xl overflow-hidden border border-border bg-card">
          {(value.filename || value.language) && (
            <div className="flex items-center justify-between px-4 py-2 text-xs font-mono bg-muted/40 border-b border-border text-muted-foreground">
              <div className="flex items-center gap-2">
                {value.filename && <span>{value.filename}</span>}
                {value.language && (
                  <span className="px-2 py-0.5 rounded bg-muted text-foreground uppercase text-[10px]">
                    {language}
                  </span>
                )}
              </div>

              <CopyButton text={value.code} />
            </div>
          )}
          <div className="dark:bg-transparent bg-[oklch(0.188_0.030_327.8311662111982)] rounded-b-xl">
            <div
              className="shiki-wrapper overflow-x-auto p-4 text-sm font-mono"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      );
    },
  },
};

export default function PortableText({ value }: { value: any }) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground wrap-break-word">
      <PortableTextComponent value={value} components={components} />
    </div>
  );
}
