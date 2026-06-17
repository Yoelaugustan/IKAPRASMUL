"use client";

import { ArrowRight } from "lucide-react";
import { ContactCtaButton } from "@/components/contact/ContactCtaButton";
import { useLang } from "@/components/shared/LanguageProvider";

export function ShareYourStorySidebar() {
  const { t } = useLang();
  return (
    <div className="rounded-2xl bg-[#00396c] p-8 shadow-lg">
      <h3 className="text-xl font-bold text-white uppercase tracking-wide leading-tight">
        {t.lists.shareTitle1}
        <br />
        {t.lists.shareTitle2}
      </h3>
      <p className="mt-1 text-sm font-bold text-[#c6b273] uppercase tracking-wide">
        {t.lists.shareSubtitle}
      </p>
      <p className="mt-4 text-[13px] leading-relaxed text-white/80">
        {t.lists.shareText}
      </p>
      <ContactCtaButton
        subject="Submit Your Story"
        className="mt-6 flex h-auto w-full items-center justify-center gap-2 rounded bg-[#c6b273] px-4 py-3 text-[13px] font-bold text-[#0a192f] transition-colors hover:bg-[#b4a05e]"
      >
        {t.lists.submitYourStory} <ArrowRight className="size-4" />
      </ContactCtaButton>
    </div>
  );
}
