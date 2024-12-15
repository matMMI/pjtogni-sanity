// src/sanity/client.ts
import { createClient } from "next-sanity";
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error("Le NEXT_PUBLIC_SANITY_PROJECT_ID est manquant");
}
if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error("Le NEXT_PUBLIC_SANITY_DATASET est manquant");
}
if (!process.env.NEXT_PUBLIC_SANITY_TOKEN) {
  throw new Error("Le NEXT_PUBLIC_SANITY_TOKEN est manquant");
}
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-03-01",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  withCredentials: true,
});
