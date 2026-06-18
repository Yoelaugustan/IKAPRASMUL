import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink, MapPin } from "lucide-react";
import { getBusinessBySlug } from "@/lib/content";
import { Container } from "@/components/layouts/Container";
import { ArticleContent } from "@/components/shared/ArticleContent";
import { BackButton } from "@/components/shared/BackButton";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { industryBadgeClass } from "@/components/business/industryMeta";
import { getServerDict } from "@/i18n/server";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);
  if (!business) return { title: "Business not found" };
  return { title: business.name, description: business.shortDescription };
}

export default async function BusinessDetailPage({ params }: Params) {
  const { slug } = await params;
  const [business, { t }] = await Promise.all([
    getBusinessBySlug(slug),
    getServerDict(),
  ]);
  if (!business) notFound();

  return (
    <article className="pb-20 pt-10">
      <Container className="max-w-3xl">
        <div className="mb-6">
          <BackButton fallback={ROUTES.business} />
        </div>

        <span
          className={cn(
            "inline-block rounded px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide",
            industryBadgeClass(business.industry),
          )}
        >
          {business.industry}
        </span>

        <h1 className="mt-3 text-3xl font-bold leading-tight text-primary sm:text-4xl">
          {business.name}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t.detail.foundedBy} {business.founder.name} ·{" "}
          {business.founder.class}
        </p>
        <p className="mt-2 flex items-center gap-2 text-sm text-foreground/80">
          <MapPin className="size-4 text-gold" /> {business.location}
        </p>

        <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-xl">
          <Image
            src={business.coverImage}
            alt={business.name}
            fill
            priority
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
          />
        </div>

        <ArticleContent html={business.description} className="mt-6" />

        {business.website && business.website !== "#" && (
          <div className="mt-6">
            <Button asChild variant="gold">
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.detail.visitWebsite} <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
        )}

        <div className="mt-10 border-t border-slate-100 pt-6">
          <BackButton fallback={ROUTES.business} dynamicLabel />
        </div>
      </Container>
    </article>
  );
}
