import type { BoardMember } from "@/types";
import { cn } from "@/lib/utils";
import { EXECUTIVE_BOARD, BOARD_DIVISIONS } from "@/data/about";
import { getServerDict } from "@/i18n/server";
import { MemberAvatarModal } from "./MemberAvatarModal";

export async function GovernanceStructure() {
  const { t } = await getServerDict();
  const { governanceTitle, executiveBoardLabel, boardMembersLabel, roles } = t.about;
  const roleLabel = (role: string) => roles[role] ?? role;

  return (
    <div>
      <h2 className="text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
        {governanceTitle}
      </h2>

      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
          {executiveBoardLabel}
        </p>
        <div className="mt-3 border-t border-gray-200 pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-6">
            {EXECUTIVE_BOARD.map((m) => (
              <MemberAvatarModal key={m.name} member={m} roleLabel={roleLabel(m.role)} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
          {boardMembersLabel}
        </p>
        <div className="mt-3">
          {/* Mobile / tablet: independent flex columns */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4 lg:hidden">
            {BOARD_DIVISIONS.map((division, index) => (
              <div
                key={division.id}
                className={cn(
                  "flex flex-col gap-y-2",
                  index % 2 === 1 && "sm:relative sm:pl-4 sm:before:content-[''] sm:before:absolute sm:before:left-0 sm:before:top-0 sm:before:h-full sm:before:w-px sm:before:bg-gray-200",
                )}
              >
                {division.members.map((m) => (
                  <MemberAvatarModal key={m.name} member={m as BoardMember} roleLabel={roleLabel(m.role)} />
                ))}
              </div>
            ))}
          </div>

          {/* Desktop: flat grid so CSS equalises row heights across all 4 columns */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-y-3">
            {BOARD_DIVISIONS.flatMap((division, divIdx) =>
              division.members.map((m, memberIdx) => (
                <div
                  key={m.name}
                  className={cn("flex items-start justify-center px-2", divIdx > 0 && "border-l border-gray-200")}
                  style={{ gridColumn: divIdx + 1, gridRow: memberIdx + 1 }}
                >
                  <MemberAvatarModal member={m as BoardMember} roleLabel={roleLabel(m.role)} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
