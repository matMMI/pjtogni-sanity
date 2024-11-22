import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "6647uzn8",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: false,
});
