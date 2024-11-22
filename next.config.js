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

module.exports = nextConfig;
