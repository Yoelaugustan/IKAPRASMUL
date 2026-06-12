"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Users } from "lucide-react";
import type { Sig } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Spotlight SIG card with a "Learn More" pop-up modal showing full details.
export function SigSpotlightCard({ sig }: { sig: Sig }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-slate-100/80 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
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
          <h4 className="text-[17px] font-bold text-slate-900">{sig.name}</h4>
          <p className="mt-1.5 text-[14px] leading-relaxed text-slate-500">
            {sig.longDescription}
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-4 inline-flex cursor-pointer items-center gap-1 text-[13.5px] font-semibold text-[#EAB308] transition-colors hover:text-[#ca8a04]"
          >
            Learn More <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg gap-0 overflow-hidden p-0">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={sig.coverImage}
              alt={sig.name}
              fill
              sizes="512px"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <DialogHeader>
              <span className="text-xs font-semibold uppercase tracking-wide text-gold">
                {sig.category}
              </span>
              <DialogTitle className="text-xl text-primary">
                {sig.name}
              </DialogTitle>
            </DialogHeader>

            <DialogDescription className="mt-3 text-sm leading-6 text-foreground/80">
              {sig.longDescription}
            </DialogDescription>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="size-4 text-gold" />
              {sig.memberCount.toLocaleString()} members
            </div>

            {sig.activities.length > 0 && (
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  What they do
                </p>
                <ul className="mt-2 space-y-1.5">
                  {sig.activities.map((a) => (
                    <li
                      key={a}
                      className="flex gap-2 text-sm text-foreground/80"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6">
              <Button
                variant="gold"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
