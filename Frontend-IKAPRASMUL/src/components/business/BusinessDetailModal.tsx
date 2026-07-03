"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Star, User, Users, X } from "lucide-react";
import type { Business } from "@/types";
import { ROUTES } from "@/constants/routes";
import { useLang } from "@/components/shared/LanguageProvider";

function PhotoMontage({ images }: { images: string[] }) {
  const [img1, img2, img3] = images;

  if (images.length >= 3) {
    return (
      <div className="flex h-full flex-col gap-1.5 bg-white">
        <div className="relative min-h-0 flex-[3]">
          <Image src={img1} alt="" fill sizes="700px" className="object-cover" />
        </div>
        <div className="flex min-h-0 flex-[2] gap-1.5">
          <div className="relative flex-1">
            <Image src={img2} alt="" fill sizes="350px" className="object-cover" />
          </div>
          <div className="relative flex-1">
            <Image src={img3} alt="" fill sizes="350px" className="object-cover" />
          </div>
        </div>
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="flex h-full flex-col gap-1.5 bg-white">
        <div className="relative min-h-0 flex-1">
          <Image src={img1} alt="" fill sizes="700px" className="object-cover" />
        </div>
        <div className="relative min-h-0 flex-1">
          <Image src={img2} alt="" fill sizes="700px" className="object-cover" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <Image src={img1} alt="" fill sizes="700px" className="object-cover" />
    </div>
  );
}

/** A label-above-value meta row with a leading outline icon. */
function MetaRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3.5">
      <span className="grid size-6 shrink-0 place-items-center text-[#13294b]">
        {icon}
      </span>
      <div className="leading-tight">
        <p className="text-[13px] text-slate-500">{label}</p>
        <p className="text-[15px] font-bold text-[#13294b]">{value}</p>
      </div>
    </div>
  );
}

export function BusinessDetailModal({
  business,
  onClose,
}: {
  business: Business;
  onClose: () => void;
}) {
  const { t } = useLang();
  const images =
    business.coverImages && business.coverImages.length > 0
      ? business.coverImages
      : [business.coverImage];

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Split the short description into paragraphs on blank lines.
  const paragraphs = business.shortDescription
    .split(/\n\s*\n|\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return createPortal(
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={business.name}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal panel. On mobile (stacked layout) the whole card scrolls as one
          column since there's no height cap otherwise — the image + details
          combined easily exceed the viewport. On desktop the two-column
          layout keeps a fixed height and only the details pane scrolls. */}
      <div
        className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-y-auto overscroll-contain rounded-[28px] bg-[#f4f4f5] shadow-2xl motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:duration-200 md:h-[85vh] md:max-h-[780px] md:min-h-[560px] md:flex-row md:overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left — photo montage */}
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden md:aspect-auto md:h-full md:w-[52%]">
          <PhotoMontage images={images} />

          {business.isFeatured && (
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-[#13294b] px-4 py-2 text-[12px] font-bold uppercase tracking-wide text-white shadow-lg">
              <Star className="size-4 fill-gold text-gold" />
              {t.bizList.featured}
            </div>
          )}
        </div>

        {/* Right — details */}
        <div className="flex min-w-0 flex-1 flex-col p-8 sm:p-10 md:min-h-0 md:overflow-y-auto">
          {/* Top row: logo (left) + alumnus badge (right) */}
          <div className="flex items-start justify-between gap-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-black/5">
              <Image
                src={business.logo}
                alt={business.name}
                fill
                sizes="64px"
                className="object-contain p-2"
              />
            </div>

            {business.founder.class && (
              <span className="flex items-center gap-2 rounded-full bg-[#f5cd6b] px-4 py-2 text-[12px] font-bold uppercase tracking-wide text-[#13294b]">
                <Users className="size-4" />
                {business.founder.class} {t.bizList.alumnus}
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            className="mt-6 text-4xl font-extrabold leading-none tracking-tight text-[#13294b] sm:text-5xl notranslate"
            translate="no"
          >
            {business.name}
          </h2>
          <span className="mt-4 block h-1 w-16 rounded-full bg-gold" />

          {/* Meta rows */}
          <div className="mt-7 space-y-4">
            <MetaRow
              icon={<User className="size-5" strokeWidth={1.75} />}
              label={t.detail.founder}
              value={business.founder.name}
            />
            {business.founder.class && (
              <MetaRow
                icon={<GraduationCap className="size-5" strokeWidth={1.75} />}
                label={t.bizList.alumniProgram}
                value={business.founder.class}
              />
            )}
          </div>

          <hr className="my-7 border-slate-200" />

          {/* Description */}
          <div className="space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-slate-600">
                {p}
              </p>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={ROUTES.businessDetail(business.slug)}
            className="mt-8 inline-flex w-fit items-center gap-3 rounded-xl bg-[#13294b] px-7 py-4 text-[14px] font-bold text-gold transition-colors hover:bg-[#1c3a66]"
          >
            {t.detail.readFullStory} <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full bg-black/30 text-white backdrop-blur transition-colors hover:bg-black/50 md:bg-white/70 md:text-slate-700 md:hover:bg-white"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>,
    document.body,
  );
}
