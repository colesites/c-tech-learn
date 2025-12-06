import { groq } from "next-sanity";
import { client } from "../client";

export const getPrivacyPolicy = async () => {
  const query = groq`*[_type == "privacyPolicy"][0] {
    title,
    _updatedAt,
    introduction,
    sections[]-> {
      number,
      title,
      content
    }
  }`;

  return await client.fetch(query);
};

export const getTermsOfService = async () => {
  const query = groq`*[_type == "termsOfService"][0] {
    title,
    _updatedAt,
    introduction,
    sections[]-> {
      number,
      title,
      content
    }
  }`;

  return await client.fetch(query);
};
