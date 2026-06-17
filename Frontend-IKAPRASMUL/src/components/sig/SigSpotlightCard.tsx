import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SigSpotlight } from "@/types";
import { ROUTES } from "@/constants/routes";

// Spotlight SIG card (news-like) — links to its detail page.
export function SigSpotlightCard({ spotlight }: { spotlight: SigSpotlight }) {
  return (
    <div className="rounded-2xl border border-slate-100/80 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <Image
          src={spotlight.image}
          alt={spotlight.name}
          fill
          sizes="380px"
          className="object-cover"
        />
      </div>
      <div className="mt-5 px-1 pb-2">
        <h4 className="text-[17px] font-bold text-slate-900">{spotlight.name}</h4>
        <p className="mt-1.5 line-clamp-3 text-[14px] leading-relaxed text-slate-500">
          {spotlight.description}
        </p>
        <Link
          href={ROUTES.sigDetail(spotlight.id)}
          className="mt-4 inline-flex items-center gap-1 text-[13.5px] font-semibold text-[#EAB308] transition-colors hover:text-[#ca8a04]"
        >
          Learn More <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
