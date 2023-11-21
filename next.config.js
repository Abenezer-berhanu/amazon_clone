/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i.ibb.co", "img.clerk.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
