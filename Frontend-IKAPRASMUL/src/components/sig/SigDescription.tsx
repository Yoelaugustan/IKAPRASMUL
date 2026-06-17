import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layouts/Container";
import { ContactCtaButton } from "@/components/contact/ContactCtaButton";
import { Reveal } from "@/components/shared/Reveal";
import { GatherIcon, MessageIcon } from "@/components/icons";
import { getServerDict } from "@/i18n/server";

export async function SigDescription() {
  const { t } = await getServerDict();
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal className="grid items-start gap-10 lg:grid-cols-[1fr_380px]">
          {/* Left — descriptive copy with circle badge icon */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
            <div className="flex size-18 shrink-0 items-center justify-center rounded-full bg-[#00396c]">
              <GatherIcon className="size-9 text-gold" />
            </div>
            <div className="space-y-5 text-[15px] leading-7 text-foreground/80">
              <p>{t.sig.descP1}</p>
              <p>{t.sig.descP2}</p>
            </div>
          </div>

          {/* Right — CTA card */}
          <div className="rounded-2xl bg-[#0b1220] p-8 text-white shadow-xl">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                <MessageIcon className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gold tracking-wide">
                  {t.sig.ctaTitle}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  {t.sig.ctaText}
                </p>
              </div>
            </div>
            <ContactCtaButton
              subject="Contact Alumni Network"
              variant="gold"
              className="mt-6 w-full text-sm font-bold h-11"
            >
              {t.sig.contactAlumniNetwork}{" "}
              <ArrowRight className="ml-1.5 size-4" />
            </ContactCtaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

