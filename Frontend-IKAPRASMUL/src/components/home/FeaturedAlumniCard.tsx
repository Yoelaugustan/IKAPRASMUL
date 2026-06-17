import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FeaturedAlumni } from "@/types";
import { ROUTES } from "@/constants/routes";

export function FeaturedAlumniCard({ alumni }: { alumni: FeaturedAlumni }) {
  return (
    <Link
      href={ROUTES.featuredAlumni}
      className="group flex flex-col overflow-hidden rounded-xl bg-card shadow-md ring-1 ring-border/60 transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={alumni.photo}
          alt={alumni.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
          Featured Alumni
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-snug text-primary">
          Alumni of the Month
        </h3>
        <p className="mt-2 text-sm font-semibold text-foreground">
          {alumni.name}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">{alumni.class}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5 group-hover:underline">
          Read Story <ArrowRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
