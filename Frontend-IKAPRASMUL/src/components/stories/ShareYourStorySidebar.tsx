import { ArrowRight } from "lucide-react";
import { ContactCtaButton } from "@/components/contact/ContactCtaButton";

export function ShareYourStorySidebar() {
  return (
    <div className="rounded-2xl bg-[#00396c] p-8 shadow-lg">
      <h3 className="text-xl font-bold text-white uppercase tracking-wide leading-tight">
        SHARE YOUR<br />STORY
      </h3>
      <p className="mt-1 text-sm font-bold text-[#c6b273] uppercase tracking-wide">
        INSPIRE THE COMMUNITY
      </p>
      <p className="mt-4 text-[13px] leading-relaxed text-white/80">
        Your story can motivate and empower others in the Prasmul alumni network.
      </p>
      <ContactCtaButton
        subject="Submit Your Story"
        className="mt-6 flex h-auto w-full items-center justify-center gap-2 rounded bg-[#c6b273] px-4 py-3 text-[13px] font-bold text-[#0a192f] transition-colors hover:bg-[#b4a05e]"
      >
        Submit Your Story <ArrowRight className="size-4" />
      </ContactCtaButton>
    </div>
  );
}
