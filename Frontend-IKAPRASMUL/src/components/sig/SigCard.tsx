import type { Sig } from "@/types";
import { SigIcon } from "./SigIcons";

// Compact SIG list item card — circular badge with icon + name. Displayed in the grid.
export function SigCard({ sig }: { sig: Sig }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-100/80 bg-white p-4 text-left shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#0a192f] text-gold">
        <SigIcon iconKey={sig.icon} className="size-5.5 text-[#c6b273]" />
      </span>
      <span className="text-sm font-semibold text-slate-800 leading-snug">
        {sig.name}
      </span>
    </div>
  );
}
