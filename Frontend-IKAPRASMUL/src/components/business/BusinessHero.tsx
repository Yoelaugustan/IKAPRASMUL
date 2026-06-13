import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";
import { Container } from "@/components/layouts/Container";
import { Button } from "@/components/ui/button";
import { ContactCtaButton } from "@/components/contact/ContactCtaButton";

// Bespoke hero for the Alumni Business page — full-bleed photo, navy wash on the
// left for the copy, and generous bottom space so the search bar (rendered by
// BusinessExplorer) can straddle the bottom edge.
export function BusinessHero() {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <Image
        src="/images/business/hero-business.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Navy wash: opaque on the left for legibility, fading to reveal the photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-primary/10" />

      <Container className="relative pt-16 pb-44 sm:pt-20 lg:pt-24 lg:pb-52">
        <div className="max-w-2xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-gold">
            <span className="h-4 w-1 rounded-sm bg-gold" />
            Alumni Business Showcase
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Built By Alumni.
            <br />
            <span className="text-gold">For Alumni.</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-white/85">
            Discover, connect, and collaborate with businesses built by Prasmul
            alumni across industries and the world.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild variant="gold" size="lg">
              <a href="#featured-businesses">
                Explore Businesses <ArrowRight />
              </a>
            </Button>
            <ContactCtaButton
              subject="List Your Business"
              variant="outline"
              size="lg"
              className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Plus /> List Your Business
            </ContactCtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
