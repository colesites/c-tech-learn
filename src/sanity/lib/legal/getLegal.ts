import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const PRIVACY_POLICY_QUERY = defineQuery(`*[_type == "privacyPolicy"][0] {
  title,
  _updatedAt,
  introduction,
  sections[]-> {
    number,
    title,
    content
  }
}`);

const TERMS_OF_SERVICE_QUERY = defineQuery(`*[_type == "termsOfService"][0] {
  title,
  _updatedAt,
  introduction,
  sections[]-> {
    number,
    title,
    content
  }
}`);

export const getPrivacyPolicy = async () => {
  const { data } = await sanityFetch({ query: PRIVACY_POLICY_QUERY });
  return data;
};

export const getTermsOfService = async () => {
  const { data } = await sanityFetch({ query: TERMS_OF_SERVICE_QUERY });
  return data;
};
