import Image from "next/image";
import Link from "next/link";
import { Bookmark, MapPin } from "lucide-react";
import type { Business } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";

export function BusinessCard({ business }: { business: Business }) {
  return (
    <Card className="group h-full overflow-hidden p-0">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Link href={ROUTES.businessDetail(business.slug)}>
          <Image
            src={business.coverImage}
            alt={business.name}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <Badge className="absolute left-3 top-3 bg-surface text-primary hover:bg-surface">
          {business.industry}
        </Badge>
        {/* Bookmark is decorative for now — saving is a future phase (PRD §4.5). */}
        <button
          type="button"
          aria-label="Save business (coming soon)"
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-background/90 text-muted-foreground transition-colors hover:text-gold"
        >
          <Bookmark className="size-4" />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Link href={ROUTES.businessDetail(business.slug)}>
          <h3 className="text-lg font-semibold text-primary group-hover:underline">
            {business.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">
          {business.founder.name} · {business.founder.class}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-foreground/80">
          {business.shortDescription}
        </p>
        <p className="mt-auto flex items-center gap-2 pt-4 text-sm text-foreground/80">
          <MapPin className="size-4 text-gold" />
          {business.location}
        </p>
      </div>
    </Card>
  );
}
