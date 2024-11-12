import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "6647uzn8",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
