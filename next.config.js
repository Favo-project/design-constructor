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
      {
        protocol: "https",
        hostname: "tailwindui.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "dynamic.bonfireassets.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3333",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SERVER_HOSTNAME,
        port: "",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
