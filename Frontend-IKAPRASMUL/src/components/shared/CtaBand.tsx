import { ArrowRight } from "lucide-react";
import type { InquirySubject } from "@/constants/categories";
import { Container } from "@/components/layouts/Container";
import { ContactCtaButton } from "@/components/contact/ContactCtaButton";

// Navy CTA band used at the bottom of marketing pages. The button opens the
// global contact modal with a pre-filled subject (it's a request, not a write).
export function CtaBand({
  title,
  description,
  buttonLabel,
  subject,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  subject: InquirySubject;
}) {
  return (
    <section className="bg-primary py-16 text-primary-foreground">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-primary-foreground/80">{description}</p>
          </div>
          <ContactCtaButton subject={subject} variant="gold" size="lg" className="shrink-0">
            {buttonLabel} <ArrowRight />
          </ContactCtaButton>
        </div>
      </Container>
    </section>
  );
}
