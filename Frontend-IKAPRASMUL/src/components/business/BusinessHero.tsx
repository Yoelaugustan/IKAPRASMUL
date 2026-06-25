import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";
import { Container } from "@/components/layouts/Container";
import { Button } from "@/components/ui/button";
import { ContactCtaButton } from "@/components/contact/ContactCtaButton";
import { HERO_BLUR } from "@/lib/heroBlur";
import { getServerDict } from "@/i18n/server";

// Bespoke hero for the Alumni Business page — full-bleed photo, navy wash on the
// left for the copy, and generous bottom space so the search bar (rendered by
// BusinessExplorer) can straddle the bottom edge.
export async function BusinessHero() {
  const { t } = await getServerDict();
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <Image
        src="/images/business/hero-business.jpg"
        alt=""
        fill
        priority
        placeholder="blur"
        blurDataURL={HERO_BLUR["/images/business/hero-business.jpg"]}
        sizes="100vw"
        className="object-cover"
      />
      {/* Navy wash: opaque on the left for legibility, fading to reveal the photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-primary/10" />

      <Container className="relative pt-16 pb-20 sm:pt-20 lg:pt-24 lg:pb-28">
        <div className="max-w-2xl [&>*]:fill-mode-both [&>*]:duration-700 [&>*]:ease-out motion-reduce:[&>*]:animate-none">
          <p className="mb-6 flex animate-in items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-gold fade-in-0 slide-in-from-bottom-4">
            <span className="h-4 w-1 rounded-sm bg-gold" />
            {t.business.heroEyebrow}
          </p>

          <h1 className="animate-in text-4xl font-extrabold leading-[1.05] tracking-tight fade-in-0 slide-in-from-bottom-4 delay-100 sm:text-5xl lg:text-6xl">
            {t.business.heroTitle1}
            <br />
            <span className="text-gold">{t.business.heroTitle2}</span>
          </h1>

          <p className="mt-6 max-w-md animate-in text-base leading-7 text-white/85 fade-in-0 slide-in-from-bottom-4 delay-200">
            {t.business.heroSubtitle}
          </p>

          <div className="mt-9 flex animate-in flex-wrap gap-4 fade-in-0 slide-in-from-bottom-4 delay-[350ms]">
            <Button asChild variant="gold" size="lg">
              <a href="#featured-businesses">
                {t.business.explore} <ArrowRight />
              </a>
            </Button>
            <ContactCtaButton
              subject="List Your Business"
              variant="outline"
              size="lg"
              className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Plus /> {t.business.listYourBusiness}
            </ContactCtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
