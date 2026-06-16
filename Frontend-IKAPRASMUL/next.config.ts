import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler (automatic memoization) — see fe-standard §11.
  // Requires the babel-plugin-react-compiler devDependency.
  reactCompiler: true,

  images: {
    // Allow remote demo/content images. Tighten to the real CDN host(s)
    // once the .NET storage/CDN is wired.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },

  // Proxy backend-hosted content images (wwwroot/media) under the frontend
  // origin, so `next/image` treats them as same-origin (no remotePatterns) and
  // the stored paths (/media/...) stay environment-agnostic.
  async rewrites() {
    const api = process.env.API_URL ?? "http://localhost:5080";
    return [
      { source: "/media/:path*", destination: `${api}/media/:path*` },
    ];
  },
};

export default nextConfig;
