/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
   },
   images: {
      /**here we can specify from where to accept images */
      remotePatterns: [
         {
            protocol: "https",
            hostname: "**",
            port: "",
            pathname: "**",
         },
      ],
   },
};

module.exports = nextConfig;
