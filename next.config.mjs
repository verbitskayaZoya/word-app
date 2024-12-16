/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // reactStrictMode: false,
};

export default nextConfig;

// https://cdn-icons-png.flaticon.com/512/2726/2726638.png
// https://www.flaticon.com/free-icon/responsibility_2726638
// https://cdn-icons-png.flaticon.com/512/5773/5773084.png

// https://cdn-icons-png.flaticon.com/128/1207/1207441.png
