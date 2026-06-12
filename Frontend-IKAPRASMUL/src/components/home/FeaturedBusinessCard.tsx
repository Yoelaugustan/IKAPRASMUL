"use client";

import Image from "next/image";
import { ArrowRight, MapPin, ExternalLink } from "lucide-react";
import type { Business } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function FeaturedBusinessCard({ business }: { business: Business }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article
        className="group flex cursor-pointer flex-col overflow-hidden rounded-xl bg-card shadow-md ring-1 ring-border/60 transition-shadow hover:shadow-lg"
        onClick={() => setOpen(true)}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={business.coverImage}
            alt={business.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
            Featured Business
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold leading-snug text-primary">
            {business.name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {business.shortDescription}
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0 text-gold" />
            {business.location}
          </p>
          <button
            className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary hover:gap-2.5 hover:underline"
            onClick={(e) => { e.stopPropagation(); setOpen(true); }}
          >
            View Detail <ArrowRight className="size-4" />
          </button>
        </div>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg p-0 overflow-hidden">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={business.coverImage}
              alt={business.name}
              fill
              sizes="512px"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 rounded bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
              Featured Business
            </span>
          </div>
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-xl text-primary">{business.name}</DialogTitle>
            </DialogHeader>
            <p className="mt-1 text-sm font-medium text-gold">{business.industry}</p>
            <p className="mt-3 text-sm leading-6 text-foreground/80">
              {business.shortDescription}
            </p>
            <div className="mt-4 space-y-1.5">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Founder:</span>{" "}
                {business.founder.name} · {business.founder.class}
              </p>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-gold" />
                {business.location}
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              {business.website && business.website !== "#" ? (
                <Button asChild variant="gold" className="flex-1">
                  <a href={business.website} target="_blank" rel="noopener noreferrer">
                    Visit Website <ExternalLink className="size-3.5" />
                  </a>
                </Button>
              ) : (
                <Button variant="gold" className="flex-1" onClick={() => setOpen(false)}>
                  Close
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
