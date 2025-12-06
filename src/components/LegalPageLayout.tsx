"use client";

import { PortableText } from "@portabletext/react";
import { Calendar, Shield, Lock, Eye } from "lucide-react";

interface LegalPageProps {
  data: {
    title: string;
    _updatedAt: string;
    introduction: string;
    sections: {
      number: string;
      title: string;
      content: any[];
    }[];
  };
  type: "privacy" | "terms";
}

const LegalPageLayout = ({ data, type }: LegalPageProps) => {
  if (!data) return null;

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Header Section */}
        <div className="mb-16 text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-4">
            {type === "privacy" ? (
              <Lock className="size-8" />
            ) : (
              <Shield className="size-8" />
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            {data.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Calendar className="size-4" />
            <span className="text-sm font-medium">
              Last Updated:{" "}
              {new Date(data._updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {data.introduction}
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid gap-8">
          {data.sections?.map((section) => (
            <div
              key={section.number}
              className="group relative bg-card/50 border border-border/50 rounded-3xl p-8 md:p-10 hover:bg-card hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                {/* Number Badge */}
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    {section.number}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-4 flex-1">
                  <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {section.title}
                  </h2>
                  <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground leading-relaxed [&>p]:mb-6 [&>p:last-child]:mb-0">
                    <PortableText value={section.content} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center p-8 rounded-3xl bg-secondary/30 border border-border/50">
          <p className="text-muted-foreground">
            Have questions about our{" "}
            {type === "privacy" ? "Privacy Policy" : "Terms"}?{" "}
            <a
              href="mailto:legal@ctechlearn.com"
              className="text-primary font-semibold hover:underline decoration-primary/30 underline-offset-4"
            >
              Contact our legal team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalPageLayout;
