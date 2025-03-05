/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/uc**",
      },
      {
        protocol: "https",
        hostname: "watermark.lovepik.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // The option below is being replaced with the newer configuration format
  // unstable_excludePages: [
  //   "/dashboard/bookings/booking-details",
  //   "/dashboard/bookings/booking-confirmation",
  //   "/contact",
  // ],
  
  // Use the newer pageExtensions option if you need to exclude specific pages
  // Or if you're excluding for dynamic routes, look into matcher in middleware.js
};

module.exports = nextConfig;