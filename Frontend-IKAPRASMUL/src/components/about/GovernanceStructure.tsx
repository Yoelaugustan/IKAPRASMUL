import Image from "next/image";
import type { BoardMember } from "@/types";
import { cn } from "@/lib/utils";

function MemberAvatar({
  member,
  withDivider,
}: {
  member: BoardMember;
  withDivider?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-2 px-2 py-5 text-center",
        // Short vertical divider on the left, hidden on the first column (sm+).
        withDivider &&
          "sm:before:absolute sm:before:left-0 sm:before:top-6 sm:before:h-20 sm:before:w-px sm:before:bg-gray-200 sm:before:content-[''] sm:[&:nth-child(4n+1)]:before:hidden",
      )}
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
        <p className="text-sm font-semibold text-foreground">{member.name}</p>
        <p className="text-xs text-muted-foreground">{member.role}</p>
      </div>
    </div>
  );
}

export function GovernanceStructure({
  executiveBoard,
  boardMembers,
}: {
  executiveBoard: BoardMember[];
  boardMembers: BoardMember[];
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
        Governance Structure
      </h2>

      {/* Executive Board — top line only, no dividers between members */}
      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
          Executive Board
        </p>
        <div className="mt-3 border-t border-gray-200">
          <div className="grid grid-cols-3 sm:grid-cols-5">
            {executiveBoard.map((m) => (
              <MemberAvatar key={m.name} member={m} />
            ))}
          </div>
        </div>
      </div>

      {/* Board Members — top line + short vertical dividers only */}
      <div className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
          Board Members
        </p>
        <div className="mt-3 border-t border-gray-200">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {boardMembers.map((m) => (
              <MemberAvatar key={m.name} member={m} withDivider />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
