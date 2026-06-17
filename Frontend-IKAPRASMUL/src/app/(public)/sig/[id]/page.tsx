import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Users } from "lucide-react";
import { getSigSpotlightById } from "@/lib/content";
import { Container } from "@/components/layouts/Container";
import { BackButton } from "@/components/shared/BackButton";
import { ROUTES } from "@/constants/routes";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const spotlight = await getSigSpotlightById(id);
  if (!spotlight) return { title: "SIG not found" };
  return { title: spotlight.name, description: spotlight.description };
}

export default async function SigSpotlightDetailPage({ params }: Params) {
  const { id } = await params;
  const spotlight = await getSigSpotlightById(id);
  if (!spotlight) notFound();

  return (
    <article className="pb-20 pt-10">
      <Container className="max-w-3xl">
        <div className="mb-6">
          <BackButton fallback={ROUTES.sig} />
        </div>

        <h1 className="mt-4 text-3xl font-bold leading-tight text-primary sm:text-4xl">
          {spotlight.name}
        </h1>

        <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-xl">
          <Image
            src={spotlight.image}
            alt={spotlight.name}
            fill
            priority
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
          />
        </div>

        <p className="mt-6 whitespace-pre-wrap text-base leading-7 text-foreground/85">
          {spotlight.description}
        </p>

        <div className="mt-10 border-t border-slate-100 pt-6">
          <BackButton fallback={ROUTES.sig} dynamicLabel />
        </div>
      </Container>
    </article>
  );
}
