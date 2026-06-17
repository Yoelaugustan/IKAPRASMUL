import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Quote } from "lucide-react";
import { getFeaturedAlumni } from "@/lib/content";
import { Container } from "@/components/layouts/Container";
import { BackButton } from "@/components/shared/BackButton";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Alumni of the Month",
};

export default async function FeaturedAlumniPage() {
  const alumni = await getFeaturedAlumni();
  if (!alumni) notFound();

  return (
    <article className="pb-20 pt-10">
      <Container className="max-w-3xl">
        <div className="mb-6">
          <BackButton fallback={ROUTES.home} />
        </div>

        <span className="inline-block rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-foreground">
          Alumni of the Month
        </span>

        <h1 className="mt-4 text-3xl font-bold leading-tight text-primary sm:text-4xl">
          {alumni.name}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {alumni.role}
          {alumni.company ? ` · ${alumni.company}` : ""}
        </p>
        <p className="mt-0.5 text-sm font-medium text-primary/70">
          {alumni.class}
        </p>

        <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-xl">
          <Image
            src={alumni.photo}
            alt={alumni.name}
            fill
            priority
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover object-top"
          />
        </div>

        <blockquote className="mt-6 flex gap-3 rounded-lg bg-surface p-5 text-base italic leading-7 text-foreground/80">
          <Quote className="mt-1 size-5 shrink-0 text-gold" />
          <span>{alumni.quote}</span>
        </blockquote>

        <div className="mt-10 border-t border-slate-100 pt-6">
          <BackButton fallback={ROUTES.home} dynamicLabel />
        </div>
      </Container>
    </article>
  );
}
