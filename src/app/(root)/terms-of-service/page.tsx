import { getTermsOfService } from "@/sanity/lib/legal/getLegal";
import LegalPageLayout from "@/components/LegalPageLayout";
import { cacheLife } from "next/cache";

const TermsPage = async () => {
  "use cache";
  cacheLife("hours");

  const data = await getTermsOfService();

  return <LegalPageLayout data={data} type="terms" />;
};

export default TermsPage;
