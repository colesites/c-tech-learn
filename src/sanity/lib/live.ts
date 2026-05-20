import { defineLive } from "next-sanity/live";
import { client } from "./client";

// Token is required for draft/preview content. For published-only live updates it can be omitted.
const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
