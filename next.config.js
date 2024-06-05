/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { serverActions: true },
};

module.exports = {
  images: {
    domains: ['res.cloudinary.com','thumb.viva.id','google.com'],
  },
}