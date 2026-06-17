import Image from "next/image";
import type { BoardMember } from "@/types";
import { cn } from "@/lib/utils";
import { EXECUTIVE_BOARD, BOARD_MEMBERS } from "@/data/about";
import { getServerDict } from "@/i18n/server";

function MemberAvatar({
  member,
  roleLabel,
  withDivider,
}: {
  member: BoardMember;
  roleLabel: string;
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
        <p className="text-xs text-muted-foreground">{roleLabel}</p>
      </div>
    </div>
  );
}

export async function GovernanceStructure() {
  const { t } = await getServerDict();
  const { governanceTitle, executiveBoardLabel, boardMembersLabel, roles } =
    t.about;
  const roleLabel = (role: string) => roles[role] ?? role;

  return (
    <div>
      <h2 className="text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
        {governanceTitle}
      </h2>

      {/* Executive Board — top line only, no dividers between members */}
      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
          {executiveBoardLabel}
        </p>
        <div className="mt-3 border-t border-gray-200">
          <div className="grid grid-cols-3 sm:grid-cols-5">
            {EXECUTIVE_BOARD.map((m) => (
              <MemberAvatar key={m.name} member={m} roleLabel={roleLabel(m.role)} />
            ))}
          </div>
        </div>
      </div>

      {/* Board Members — top line + short vertical dividers only */}
      <div className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
          {boardMembersLabel}
        </p>
        <div className="mt-3 border-t border-gray-200">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {BOARD_MEMBERS.map((m) => (
              <MemberAvatar
                key={m.name}
                member={m}
                roleLabel={roleLabel(m.role)}
                withDivider
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
