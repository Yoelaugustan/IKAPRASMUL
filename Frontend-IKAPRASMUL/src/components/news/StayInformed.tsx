import { Mail } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";

// "Stay Informed" newsletter card on the News page (light variant).
export function StayInformed() {
  return (
    <div className="rounded-2xl border bg-card p-8 shadow-sm">
      <span className="grid size-12 place-items-center rounded-full bg-gold/15 text-gold-dark">
        <Mail className="size-6" />
      </span>
      <h3 className="mt-4 text-xl font-bold text-primary">Stay Informed</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Get the latest alumni news, research, and insights delivered to your
        inbox.
      </p>
      <div className="mt-5">
        <NewsletterForm variant="card" />
      </div>
    </div>
  );
}
