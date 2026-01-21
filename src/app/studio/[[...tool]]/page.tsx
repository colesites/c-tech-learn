/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export { metadata, viewport } from "next-sanity/studio";

function StudioFallback() {
  return (
    <div className="p-6 text-sm text-muted-foreground">
      <Spinner className="size-10 text-primary" />
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense fallback={<StudioFallback />}>
      <NextStudio config={config} />;
    </Suspense>
  );
}
