/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      sharp: "commonjs sharp",
      canvas: "commonjs canvas",
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c.bonfireassets.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.bonfire.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
