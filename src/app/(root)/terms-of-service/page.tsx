import { getTermsOfService } from "@/sanity/lib/legal/getLegal";
import LegalPageLayout from "@/components/LegalPageLayout";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

const TermsPage = async () => {
  "use cache";
  cacheLife("hours");

  const data = await getTermsOfService();

  return (
    <Suspense fallback={<Spinner className="size-8 text-primary" />}>
      <LegalPageLayout data={data} type="terms" />
    </Suspense>
  );
};

export default TermsPage;
