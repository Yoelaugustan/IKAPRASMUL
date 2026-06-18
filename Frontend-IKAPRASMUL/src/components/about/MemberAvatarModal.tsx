"use client";

import Image from "next/image";
import type { BoardMember } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function MemberAvatarModal({
  member,
  roleLabel,
}: {
  member: BoardMember;
  roleLabel: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex flex-col items-center gap-2 px-1 py-4 text-center transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg cursor-pointer"
        >
          <div className="relative size-16 overflow-hidden rounded-full shadow-sm ring-1 ring-gray-200 sm:size-[68px]">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="68px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight text-foreground">
              {member.name}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{roleLabel}</p>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-xs p-0 overflow-hidden rounded-2xl">
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
          <DialogTitle className="text-lg font-bold text-primary leading-snug">
            {member.name}
          </DialogTitle>
          <p className="mt-1 text-sm text-muted-foreground">{roleLabel}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
