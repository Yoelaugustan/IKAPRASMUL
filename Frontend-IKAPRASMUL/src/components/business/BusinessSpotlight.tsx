import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Business } from "@/types";
import { EmptyState } from "@/components/shared/EmptyState";
import { ROUTES } from "@/constants/routes";

function SpotlightHeader() {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="h-4 w-1 rounded bg-[#0a192f]" />
      <h2 className="text-sm font-bold uppercase tracking-widest text-[#00396c]">
        Alumni Business Spotlight
      </h2>
    </div>
  );
}

// "Alumni Business Spotlight" card — features one business from the DB (the
// flagged spotlight, else the first listing). Shows a placeholder when none.
export function BusinessSpotlight({ business }: { business?: Business }) {
  if (!business) {
    return (
      <div>
        <SpotlightHeader />
        <EmptyState
          title="No spotlight available right now"
          description="Please check back shortly."
          className="py-10"
        />
      </div>
    );
  }

  const avatar = business.founder.avatar ?? business.logo;

  return (
    <div>
      <SpotlightHeader />

      <div className="overflow-hidden rounded-2xl bg-[#00396c] shadow-lg">
        <div className="relative aspect-[16/9]">
          <Image
            src={business.coverImage}
            alt={business.name}
            fill
            sizes="360px"
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gold">
            Featured Story
          </p>
          <h3 className="mt-2 text-xl font-bold leading-snug text-white">
            {business.name}
          </h3>
          <p className="mt-3 line-clamp-3 text-[13.5px] leading-relaxed text-white/75">
            {business.shortDescription}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <span className="relative size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20">
              <Image
                src={avatar}
                alt={business.founder.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            </span>
            <div className="text-[13px] leading-tight">
              <p className="font-bold text-white">
                Founder: {business.founder.name} ({business.founder.class})
              </p>
              <p className="text-white/60">{business.location}</p>
            </div>
          </div>

          <Link
            href={ROUTES.businessDetail(business.slug)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-[13px] font-bold text-gold-foreground transition-colors hover:bg-gold-dark"
          >
            Read Full Story <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
