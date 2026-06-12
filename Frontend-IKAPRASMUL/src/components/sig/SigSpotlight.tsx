import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getSigs } from "@/lib/content";

// SIG Spotlight sidebar — shows 2 featured SIGs with images, displayed as
// stacked cards on the right side of the SIG groups section.
export async function SigSpotlight() {
  const allSigs = await getSigs();
  const spotlights = allSigs.filter((s) => s.isSpotlight).slice(0, 2);
  if (spotlights.length === 0) return null;

  return (
    <div>
      <h3 className="mb-8 text-xl font-bold uppercase tracking-wide text-[#00396c]">
        SIG Spotlight
      </h3>
      <div className="space-y-6">
        {spotlights.map((sig) => (
          <div
            key={sig.id}
            className="rounded-2xl border border-slate-100/80 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src={sig.coverImage}
                alt={sig.name}
                fill
                sizes="380px"
                className="object-cover"
              />
            </div>
            <div className="mt-5 px-1 pb-2">
              <h4 className="text-[17px] font-bold text-slate-900">
                {sig.name}
              </h4>
              <p className="mt-1.5 text-[14px] leading-relaxed text-slate-500">
                {sig.longDescription}
              </p>
              <p className="mt-4 inline-flex cursor-pointer items-center gap-1 text-[13.5px] font-semibold text-[#EAB308] transition-colors hover:text-[#ca8a04]">
                Learn More <ArrowRight className="size-4" />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

