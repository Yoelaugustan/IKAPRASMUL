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
};

export default nextConfig;
