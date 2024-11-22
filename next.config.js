const nextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = nextConfig;
