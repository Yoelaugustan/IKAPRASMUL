import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { NavSourceProvider } from "@/components/shared/NavSourceProvider";
import { LanguageProvider } from "@/components/shared/LanguageProvider";
import { getLang } from "@/i18n/server";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IKAPRASMUL - Ikatan Alumni Prasetiya Mulya",
    template: "%s · IKAPRASMUL",
  },
  description:
    "The digital home for Prasetiya Mulya alumni. Connect. Grow. Give Back. Discover alumni stories, businesses, shared interest groups, and news.",
  metadataBase: new URL("https://Ikaprasmul.id"),
  openGraph: {
    title: "IKAPRASMUL - Prasmul Alumni Association",
    description: "Connect. Grow. Give Back.",
    type: "website",
  },
};

// Root layout stays minimal — public chrome lives in app/(public)/layout.tsx,
// and the admin areas bring their own layouts. Providers + Toaster are global.
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();

  return (
    <html lang={lang} className={`${sans.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <SmoothScroll />
        <Providers>
          <LanguageProvider initialLang={lang}>
            <NavSourceProvider>{children}</NavSourceProvider>
            <Toaster richColors position="top-center" />
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
