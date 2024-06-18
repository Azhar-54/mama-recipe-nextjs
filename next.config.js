/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { serverActions: true },
  images: {
    domains: ['res.cloudinary.com', 'thumb.viva.id', 'google.com', 'asset-2.tstatic.net','img-global.cpcdn.com','i.ytimg.com','asset.kompas.com','statics.indozone.news' ],
  },
};

module.exports = nextConfig;
