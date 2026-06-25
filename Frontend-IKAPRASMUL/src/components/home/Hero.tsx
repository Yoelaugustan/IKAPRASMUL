import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layouts/Container";
import { ROUTES } from "@/constants/routes";
import { HERO_BLUR } from "@/lib/heroBlur";
import { getServerDict } from "@/i18n/server";

export async function Hero() {
  const { t } = await getServerDict();
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Full-bleed campus backdrop */}
      <Image
        src="/images/home/hero-campus.jpg"
        alt="Prasetiya Mulya campus"
        fill
        priority
        placeholder="blur"
        blurDataURL={HERO_BLUR["/images/home/hero-campus.jpg"]}
        sizes="100vw"
        className="object-cover"
      />
      {/* Subtle navy tint — left side legible, campus clearly visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent" />

      <Container className="relative pt-20 pb-44 sm:pt-24 lg:pt-28 lg:pb-52">
        <div className="max-w-2xl [&>*]:fill-mode-both [&>*]:duration-700 [&>*]:ease-out motion-reduce:[&>*]:animate-none">
          <h1 className="animate-in fade-in-0 slide-in-from-bottom-4 text-4xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {t.home.heroTitleLine1}
            <br />
            <span className="text-gold">{t.home.heroTitleLine2}</span>
          </h1>

          <div className="mt-8 animate-in fade-in-0 slide-in-from-bottom-4 space-y-1 text-3xl font-bold delay-150 sm:text-4xl">
            <p>
              {t.home.connect}
              <span className="text-gold">.</span>
            </p>
            <p>
              {t.home.grow}
              <span className="text-gold">.</span>
            </p>
            <p>
              {t.home.giveBack}
              <span className="text-gold">.</span>
            </p>
          </div>

          <p className="mt-6 max-w-md animate-in fade-in-0 slide-in-from-bottom-4 text-base leading-7 text-primary-foreground/85 delay-300">
            {t.home.heroSubtitle}
          </p>

          <div className="mt-9 flex animate-in flex-wrap gap-4 fade-in-0 slide-in-from-bottom-4 delay-500">
            <Button asChild variant="gold" size="lg">
              <Link href={ROUTES.sig}>
                {t.home.joinSig} <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/50 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
            >
              <Link href={ROUTES.business}>
                {t.home.alumniBusiness} <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
