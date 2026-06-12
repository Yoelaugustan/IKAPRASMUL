import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { getBusinessSpotlight } from "@/lib/content";
import { Section } from "@/components/layouts/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export async function BusinessSpotlight() {
  const business = await getBusinessSpotlight();
  if (!business) return null;

  return (
    <Section variant="surface" eyebrow="Alumni Business Spotlight" title="Built by alumni">
      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm lg:grid lg:grid-cols-2">
        <div className="relative aspect-[16/10] lg:aspect-auto">
          <Image
            src={business.coverImage}
            alt={business.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-8 lg:p-10">
          <Badge className="w-fit bg-gold text-gold-foreground hover:bg-gold">
            {business.industry}
          </Badge>
          <h3 className="mt-4 text-2xl font-bold text-primary">{business.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {business.founder.name} · {business.founder.class}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-foreground/80">
            <MapPin className="size-4 text-gold" />
            {business.location}
          </p>
          <p className="mt-4 text-sm leading-7 text-foreground/80">
            {business.shortDescription}
          </p>
          <Button asChild variant="gold" className="mt-6 w-fit">
            <Link href={ROUTES.businessDetail(business.slug)}>
              View business <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
