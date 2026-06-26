import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layouts/Container";

export default function PublicNotFoundPage() {
  return (
    <section className="relative flex min-h-[80dvh] items-center overflow-hidden bg-primary text-primary-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-end pr-8 lg:pr-16"
      >
        <span className="text-[clamp(8rem,30vw,22rem)] font-extrabold leading-none text-white/5">
          404
        </span>
      </div>

      <Container className="relative py-28 sm:py-36">
        <div className="max-w-xl animate-in fade-in-0 slide-in-from-bottom-4 duration-700 ease-out motion-reduce:animate-none">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Error 404
          </p>
          <h1 className="mt-4 text-4xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
            Page not
            <br />
            <span className="text-gold">found.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-primary-foreground/75">
            The page you&apos;re looking for may have been moved, renamed, or
            no longer exists. Let&apos;s get you back on track.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="gold" size="lg">
              <Link href="/">
                <Home className="size-4" />
                Back to Home
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/50 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
            >
              <Link href="/stories">Browse Alumni Stories</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
