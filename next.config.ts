/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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
  unstable_excludePages: [
    "/dashboard/bookings/booking-details",
    "/dashboard/bookings/booking-confirmation",
    "/contact",
  ],
};

module.exports = nextConfig;
