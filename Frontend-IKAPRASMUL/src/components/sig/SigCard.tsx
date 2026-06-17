"use client";

import Image from "next/image";
import type { SigGroup } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Compact SIG list item — circular badge + name, which triggers a popup modal.
export function SigCard({ sig }: { sig: SigGroup }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex w-full items-center gap-4 rounded-xl border border-slate-100/80 bg-white p-4 text-left shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus:outline-none">
          <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[#0a192f]">
            <Image
              src={sig.image as string}
              alt={sig.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          </span>
          <span className="text-sm font-semibold leading-snug text-slate-800">
            {sig.name}
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">{sig.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
          <div className="relative aspect-square w-full max-w-[300px] overflow-hidden rounded-xl bg-white">
            <Image
              src={sig.image as string}
              alt={sig.name}
              fill
              className="object-contain p-2"
            />
          </div>
          <h3 className="text-center text-xl font-bold text-primary">
            {sig.name}
          </h3>
        </div>
      </DialogContent>
    </Dialog>
  );
}
