"use client";

import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";
import type { FeaturedAlumni } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function FeaturedAlumniCard({ alumni }: { alumni: FeaturedAlumni }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article
        className="group flex cursor-pointer flex-col overflow-hidden rounded-xl bg-card shadow-md ring-1 ring-border/60 transition-shadow hover:shadow-lg"
        onClick={() => setOpen(true)}
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
          <button
            className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary hover:gap-2.5 hover:underline"
            onClick={(e) => { e.stopPropagation(); setOpen(true); }}
          >
            Read Story <ArrowRight className="size-4" />
          </button>
        </div>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg p-0 overflow-hidden">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={alumni.photo}
              alt={alumni.name}
              fill
              sizes="512px"
              className="object-cover object-top"
            />
            <span className="absolute left-4 top-4 rounded bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
              Alumni of the Month
            </span>
          </div>
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-xl text-primary">{alumni.name}</DialogTitle>
            </DialogHeader>
            <p className="mt-1 text-sm text-muted-foreground">
              {alumni.role}{alumni.company ? ` · ${alumni.company}` : ""}
            </p>
            <p className="mt-0.5 text-sm font-medium text-primary/70">
              {alumni.class}
            </p>
            <blockquote className="mt-5 flex gap-3 rounded-lg bg-surface p-4 text-sm italic leading-6 text-foreground/80">
              <Quote className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>{alumni.quote}</span>
            </blockquote>
            <div className="mt-6">
              <Button variant="gold" className="w-full" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
