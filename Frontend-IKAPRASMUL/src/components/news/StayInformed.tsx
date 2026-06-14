import { Mail } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";

// "Stay Informed" newsletter card on the News page (navy variant).
export function StayInformed() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#00396c] p-6 shadow-lg">
      <Mail className="absolute -right-3 -top-3 size-24 text-white/5" />
      <h3 className="text-lg font-bold uppercase tracking-wide text-white">
        Stay Informed
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-white/75">
        Subscribe to our newsletter and get the latest insights delivered to
        your inbox.
      </p>
      <div className="mt-5">
        <NewsletterForm variant="footer" />
      </div>
    </div>
  );
}
