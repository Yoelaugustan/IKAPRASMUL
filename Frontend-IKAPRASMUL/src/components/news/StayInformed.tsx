"use client";

import { Mail } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { useLang } from "@/components/shared/LanguageProvider";

// "Stay Informed" newsletter card on the News page (navy variant).
export function StayInformed() {
  const { t } = useLang();
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#00396c] p-6 shadow-lg">
      <Mail className="absolute -right-3 -top-3 size-24 text-white/5" />
      <h3 className="text-lg font-bold uppercase tracking-wide text-white">
        {t.newsList.stayInformedTitle}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-white/75">
        {t.newsList.stayInformedText}
      </p>
      <div className="mt-5">
        <NewsletterForm variant="footer" />
      </div>
    </div>
  );
}
