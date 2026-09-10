// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;



import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },

  async redirects() {
    return [
      {
        source: "/nios-hall-ticket-for-class-10th-12th",
        destination: "/nios-hall-ticket",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;