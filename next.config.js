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
};

module.exports = withPWA(nextConfig);
