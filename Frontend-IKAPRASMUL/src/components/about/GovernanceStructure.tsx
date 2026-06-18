import Image from "next/image";
import type { BoardMember } from "@/types";
import { cn } from "@/lib/utils";
import { EXECUTIVE_BOARD, BOARD_DIVISIONS } from "@/data/about";
import { getServerDict } from "@/i18n/server";

function MemberAvatar({
  member,
  roleLabel,
}: {
  member: BoardMember;
  roleLabel: string;
}) {
  return (
    <div className="relative flex flex-col items-center gap-2 px-1 py-4 text-center">
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
        <p className="text-sm font-semibold leading-tight text-foreground">{member.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{roleLabel}</p>
      </div>
    </div>
  );
}

export async function GovernanceStructure() {
  const { t } = await getServerDict();
  const { governanceTitle, executiveBoardLabel, boardMembersLabel, roles } = t.about;
  const roleLabel = (role: string) => roles[role] ?? role;

  return (
    <div>
      <h2 className="text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
        {governanceTitle}
      </h2>

      {/* --- Executive Board (Pengurus Inti) --- */}
      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
          {executiveBoardLabel}
        </p>
        <div className="mt-3 border-t border-gray-200 pt-4">
          {/* Uses 5 columns. First 5 members (Ketum + WKs) on top row, next 4 members on bottom row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-6">
            {EXECUTIVE_BOARD.map((m) => (
              <MemberAvatar key={m.name} member={m} roleLabel={roleLabel(m.role)} />
            ))}
          </div>
        </div>
      </div>

      {/* --- Board Members by Division (Dewan Inti) --- */}
      <div className="mt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
          {boardMembersLabel}
        </p>
        <div className="mt-3 border-t border-gray-200 pt-4">
          {/* 4 Distinct Columns for 4 Divisions */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {BOARD_DIVISIONS.map((division, index) => (
              <div
                key={division.id}
                className={cn(
                  "flex flex-col gap-y-2",
                  // index 1 & 3 are always in the right column at both sm (2-col) and lg (4-col)
                  index % 2 === 1 && "sm:relative sm:pl-4 sm:before:content-[''] sm:before:absolute sm:before:left-0 sm:before:top-0 sm:before:h-full sm:before:w-px sm:before:bg-gray-200",
                  // index 2 is first column at sm (no divider), third column only at lg
                  index === 2 && "lg:relative lg:pl-4 lg:before:content-[''] lg:before:absolute lg:before:left-0 lg:before:top-0 lg:before:h-full lg:before:w-px lg:before:bg-gray-200"
                )}
              >
                {division.members.map((m) => (
                  <MemberAvatar
                    key={m.name}
                    member={m as BoardMember}
                    roleLabel={roleLabel(m.role)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}