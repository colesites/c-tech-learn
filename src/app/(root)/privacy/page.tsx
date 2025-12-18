import { getPrivacyPolicy } from "@/sanity/lib/legal/getLegal";
import LegalPageLayout from "@/components/LegalPageLayout";
import { cacheLife } from "next/cache";

const PrivacyPolicyPage = async () => {
  "use cache";
  cacheLife("hours");

  const data = await getPrivacyPolicy();

  return <LegalPageLayout data={data} type="privacy" />;
};

export default PrivacyPolicyPage;
