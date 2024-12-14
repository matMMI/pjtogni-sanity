const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
  },
  generateBuildId: () => "build",
  headers: async () => [
    {
      source: "/service-worker.js",
      headers: [{ key: "Service-Worker-Allowed", value: "/" }],
    },
  ],
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: "6647uzn8",
    NEXT_PUBLIC_SANITY_DATASET: "production",
    NEXT_PUBLIC_SANITY_TOKEN:
      "sku0ITF1zs6pE1G4XbvUuG5JnqiFFGbpb3CLTcNYsLNjZdhnXl9YkB9scruvQss0Z13Rl8oJKV7aZdBI5uTEpKsJ211MBHUpiNGEWHwp6JLFGfCpZLbrFIWwa4VcZCznACD5PRJaMMKNQBsaqQvPyxVeWxXg8G7pTXXhX9f2Go07elPvDQEn",
  },
};

module.exports = withPWA(nextConfig);
