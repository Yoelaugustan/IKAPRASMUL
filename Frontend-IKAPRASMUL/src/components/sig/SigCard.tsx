"use client";

import { useState } from "react";
import Image from "next/image";
import type { SigGroup } from "@/types";
import { SigIcon } from "./SigIcons";

// Compact SIG list item — circular badge + name. The badge shows the SIG image,
// falling back to the icon when there's no image or it fails to load.
export function SigCard({ sig }: { sig: SigGroup }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(sig.image) && !imageFailed;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-100/80 bg-white p-4 text-left shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
      {showImage ? (
        <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[#0a192f]">
          <Image
            src={sig.image as string}
            alt={sig.name}
            fill
            sizes="48px"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        </span>
      ) : (
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#0a192f] text-gold">
          <SigIcon iconKey={sig.icon} className="size-5.5 text-[#c6b273]" />
        </span>
      )}
      <span className="text-sm font-semibold leading-snug text-slate-800">
        {sig.name}
      </span>
    </div>
  );
}
