"use client";

import Image from "next/image";
import { LinkedinIcon } from "@/components/icons";
import type { BoardMember } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function BoardMemberCard({
  member,
  roleLabel,
}: {
  member: BoardMember;
  roleLabel: string;
}) {
  return (
    <div className="flex h-full flex-col items-center rounded-2xl border border-slate-100 bg-white px-4 py-7 text-center shadow-sm transition-[transform,box-shadow] duration-300 ease-expo hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-18px_rgba(0,57,108,0.30)]">
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="flex w-full flex-col items-center rounded-xl transition-opacity hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <div className="relative size-24 shrink-0 overflow-hidden rounded-full shadow-sm ring-1 ring-gray-200 sm:size-28">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
            
            <div className="mt-4 flex min-h-[88px] flex-col items-center justify-center gap-1">
              <p className="text-[15px] font-bold leading-snug text-primary">
                {member.name}
              </p>
              <p className="text-sm font-semibold text-gold">{roleLabel}</p>
            </div>
          </button>
        </DialogTrigger>

        <DialogContent className="max-w-xs overflow-hidden rounded-2xl p-0">
          <div className="relative aspect-[3/4] w-full bg-gray-100">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="320px"
              className="object-cover object-top"
            />
          </div>
          <div className="px-6 py-5 text-center">
            <DialogTitle className="text-lg font-bold leading-snug text-primary">
              {member.name}
            </DialogTitle>
            <p className="mt-1 text-sm text-muted-foreground">{roleLabel}</p>
          </div>
        </DialogContent>
      </Dialog>

      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="mt-3 grid size-7 place-items-center rounded-full bg-primary text-white transition-colors hover:bg-primary/85"
        >
          <LinkedinIcon className="size-3.5" />
        </a>
      )}
    </div>
  );
}
