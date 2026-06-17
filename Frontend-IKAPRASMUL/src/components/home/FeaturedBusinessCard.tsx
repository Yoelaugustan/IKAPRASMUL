import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Business } from "@/types";
import { ROUTES } from "@/constants/routes";
import { getServerDict } from "@/i18n/server";

export async function FeaturedBusinessCard({
  business,
}: {
  business: Business;
}) {
  const { t } = await getServerDict();
  return (
    <Link
      href={ROUTES.businessDetail(business.slug)}
      className="group flex flex-col overflow-hidden rounded-xl bg-card shadow-md ring-1 ring-border/60 transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={business.coverImage}
          alt={business.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
          {t.cards.featuredBusiness}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-snug text-primary">
          {business.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {business.shortDescription}
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-gold" />
          {business.location}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5 group-hover:underline">
          {t.cards.viewDetail} <ArrowRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
