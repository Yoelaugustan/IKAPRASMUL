import { ArrowRight, MessageSquareMore } from "lucide-react";
import { Container } from "@/components/layouts/Container";
import { ContactCtaButton } from "@/components/contact/ContactCtaButton";
import { SigGroupIcon } from "./SigGroupIcon";

export function SigDescription() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px]">
          {/* Left — descriptive copy with circle badge icon */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
            <div className="flex size-18 shrink-0 items-center justify-center rounded-full bg-[#00396c]">
              <SigGroupIcon className="size-9 text-gold" />
            </div>
            <div className="space-y-5 text-[15px] leading-7 text-foreground/80">
              <p>
                Shared Interest Group (SIG) is a platform created for Prasetiya
                Mulya alumni to discuss, share, and learn about something they are
                passionate about—whether it&apos;s a hobby, social activity, or a
                specific professional topic.
              </p>
              <p>
                There are many activities you can do in a SIG, from gatherings,
                creating webinar materials, social initiatives, knowledge sharing,
                and more. Even if a SIG wants to organize a large-scale event,
                it&apos;s possible with the support of IKAPRASMUL and the
                Prasetiya Mulya Alumni Network.
              </p>
            </div>
          </div>

          {/* Right — CTA card */}
          <div className="rounded-2xl bg-[#0b1220] p-8 text-white shadow-xl">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                <MessageSquareMore className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gold tracking-wide">
                  Interested in joining a SIG?
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  Get in touch with the Alumni Network to find the right SIG for
                  you.
                </p>
              </div>
            </div>
            <ContactCtaButton
              subject="Contact Alumni Network"
              variant="gold"
              className="mt-6 w-full text-sm font-bold h-11"
            >
              Contact Alumni Network <ArrowRight className="ml-1.5 size-4" />
            </ContactCtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

