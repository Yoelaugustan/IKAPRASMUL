"use client";

import Image from "next/image";
import { ExternalLink, MapPin } from "lucide-react";
import type { Business } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArticleContent } from "@/components/shared/ArticleContent";
import { cn } from "@/lib/utils";
import { industryBadgeClass } from "./industryMeta";

export function BusinessDetailModal({
  business,
  open,
  onOpenChange,
}: {
  business: Business;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl gap-0 overflow-y-auto p-0">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={business.coverImage}
            alt={business.name}
            fill
            sizes="640px"
            className="object-cover"
          />
        </div>
        <div className="p-6 sm:p-8">
          <span
            className={cn(
              "inline-block rounded px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide",
              industryBadgeClass(business.industry),
            )}
          >
            {business.industry}
          </span>
          <DialogHeader className="mt-3">
            <DialogTitle className="text-2xl text-primary">
              {business.name}
            </DialogTitle>
          </DialogHeader>
          <p className="mt-1 text-sm text-muted-foreground">
            Founded by {business.founder.name} · {business.founder.class}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-foreground/80">
            <MapPin className="size-4 text-gold" />
            {business.location}
          </p>

          <ArticleContent html={business.description} className="mt-5 text-[15px]" />

          {business.website && business.website !== "#" && (
            <div className="mt-6">
              <Button asChild variant="gold">
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website <ExternalLink className="size-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
