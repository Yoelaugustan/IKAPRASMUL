import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layouts/Container";
import { ROUTES } from "@/constants/routes";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Full-bleed campus backdrop */}
      <Image
        src="/images/home/hero-campus.jpg"
        alt="Prasetiya Mulya campus"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Subtle navy tint — left side legible, campus clearly visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent" />

      <Container className="relative pt-20 pb-44 sm:pt-24 lg:pt-28 lg:pb-52">
        <div className="max-w-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-700 ease-out motion-reduce:animate-none">
          <h1 className="text-4xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Welcome Home,
            <br />
            <span className="text-gold">Prasmul Alumni</span>
          </h1>

          <div className="mt-8 space-y-1 text-3xl font-bold sm:text-4xl">
            <p>
              Connect<span className="text-gold">.</span>
            </p>
            <p>
              Grow<span className="text-gold">.</span>
            </p>
            <p>
              Give Back<span className="text-gold">.</span>
            </p>
          </div>

          <p className="mt-6 max-w-md text-base leading-7 text-primary-foreground/85">
            A digital home connecting alumni, campus, industry, and
            opportunities throughout every stage of life and career.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild variant="gold" size="lg">
              <Link href={ROUTES.sig}>
                Join SIG <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/50 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
            >
              <Link href={ROUTES.business}>
                Alumni Business <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
