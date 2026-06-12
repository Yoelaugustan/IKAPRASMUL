import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Globe, MapPin } from "lucide-react";
import { Container } from "@/components/layouts/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArticleContent } from "@/components/shared/ArticleContent";
import { CtaBand } from "@/components/shared/CtaBand";
import { ROUTES } from "@/constants/routes";
import { getBusinesses, getBusinessBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const businesses = await getBusinesses();
  return businesses.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/business/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);
  if (!business) return { title: "Business not found" };
  return {
    title: business.name,
    description: business.shortDescription,
    openGraph: {
      title: business.name,
      description: business.shortDescription,
      images: [business.coverImage],
    },
  };
}

export default async function BusinessDetailPage({
  params,
}: PageProps<"/business/[slug]">) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);
  if (!business) notFound();

  return (
    <>
      <div className="relative h-64 overflow-hidden sm:h-80">
        <Image
          src={business.coverImage}
          alt={business.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/10" />
      </div>

      <Container className="max-w-3xl pb-12">
        <div className="-mt-16 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <Link
            href={ROUTES.business}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Back to Business
          </Link>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge className="bg-surface text-primary hover:bg-surface">
                {business.industry}
              </Badge>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-primary">
                {business.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Founded by {business.founder.name} · {business.founder.class}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-foreground/80">
                <MapPin className="size-4 text-gold" />
                {business.location}
              </p>
            </div>
            {business.website && (
              <Button asChild variant="gold">
                <a href={business.website} target="_blank" rel="noopener noreferrer">
                  <Globe /> Visit website
                </a>
              </Button>
            )}
          </div>

          <ArticleContent html={business.description} className="mt-6" />
        </div>
      </Container>

      <CtaBand
        title="Want to be listed here?"
        description="Request a listing and the alumni network will add your venture to the directory."
        buttonLabel="List Your Business"
        subject="List Your Business"
      />
    </>
  );
}
