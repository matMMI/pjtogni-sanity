import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "6647uzn8",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
