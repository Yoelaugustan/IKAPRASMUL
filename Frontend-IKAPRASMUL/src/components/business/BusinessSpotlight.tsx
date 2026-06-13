"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Editorial "Alumni Business Spotlight" card shown beside the featured grid.
const SPOTLIGHT = {
  image: "https://picsum.photos/seed/spotlight-impact/800/500",
  title: "Turning Ideas Into Impact",
  description:
    "From a simple idea at Prasmul to a thriving business that creates value for thousands of customers across Indonesia.",
  body:
    "What started as a student project has grown into one of the region's most recognized alumni ventures. By staying close to the Prasmul community — hiring alumni, mentoring student teams, and partnering with fellow founders — the company has turned a simple idea into lasting impact for thousands of customers across Indonesia.",
  founder: "Budi Setiawan",
  founderClass: "MM '10",
  company: "PT Maju Bersama Global",
  avatar: "https://i.pravatar.cc/120?img=15",
};

export function BusinessSpotlight() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className="h-4 w-1 rounded bg-[#0a192f]" />
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#00396c]">
          Alumni Business Spotlight
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl bg-[#00396c] shadow-lg">
        <div className="relative aspect-[16/9]">
          <Image
            src={SPOTLIGHT.image}
            alt={SPOTLIGHT.title}
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
            {SPOTLIGHT.title}
          </h3>
          <p className="mt-3 text-[13.5px] leading-relaxed text-white/75">
            {SPOTLIGHT.description}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <span className="relative size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20">
              <Image
                src={SPOTLIGHT.avatar}
                alt={SPOTLIGHT.founder}
                fill
                sizes="40px"
                className="object-cover"
              />
            </span>
            <div className="text-[13px] leading-tight">
              <p className="font-bold text-white">
                Founder: {SPOTLIGHT.founder} ({SPOTLIGHT.founderClass})
              </p>
              <p className="text-white/60">{SPOTLIGHT.company}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-[13px] font-bold text-gold-foreground transition-colors hover:bg-gold-dark"
          >
            Read Full Story <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl gap-0 overflow-y-auto p-0">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={SPOTLIGHT.image}
              alt={SPOTLIGHT.title}
              fill
              sizes="640px"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-foreground">
              Featured Story
            </span>
          </div>
          <div className="p-6 sm:p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl text-primary">
                {SPOTLIGHT.title}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4 flex items-center gap-3">
              <span className="relative size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-slate-200">
                <Image
                  src={SPOTLIGHT.avatar}
                  alt={SPOTLIGHT.founder}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </span>
              <div className="text-sm leading-tight">
                <p className="font-semibold text-foreground">
                  {SPOTLIGHT.founder} ({SPOTLIGHT.founderClass})
                </p>
                <p className="text-muted-foreground">{SPOTLIGHT.company}</p>
              </div>
            </div>
            <p className="mt-5 text-[15px] leading-7 text-foreground/85">
              {SPOTLIGHT.body}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
