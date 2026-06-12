import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IKAPRASMUL — Prasmul Alumni Association",
    template: "%s · IKAPRASMUL",
  },
  description:
    "The digital home for Prasetiya Mulya alumni. Connect. Grow. Give Back. Discover alumni stories, businesses, shared interest groups, and news.",
  metadataBase: new URL("https://ikaprasmul.example"),
  openGraph: {
    title: "IKAPRASMUL — Prasmul Alumni Association",
    description: "Connect. Grow. Give Back.",
    type: "website",
  },
};

// Root layout stays minimal — public chrome lives in app/(public)/layout.tsx,
// and the admin areas bring their own layouts. Providers + Toaster are global.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Providers>
          {children}
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
