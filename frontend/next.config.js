/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'], 
    formats: ['image/avif', 'image/webp'], 
  },
};

module.exports = nextConfig;