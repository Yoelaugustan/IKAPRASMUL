import type { BoardMember } from "@/types";
import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { BoardMemberCard } from "./BoardMemberCard";
import { getServerDict } from "@/i18n/server";

export async function BoardSection({
  id,
  title,
  members,
  tint = false,
}: {
  id: string;
  title: string;
  members: BoardMember[];
  /** Alternate section background so consecutive board groups read as distinct rows. */
  tint?: boolean;
}) {
  const { t } = await getServerDict();
  const roleLabel = (role: string) => t.about.roles[role] ?? role;

  return (
    <section
      id={id}
      className={`scroll-mt-[150px] py-14 sm:py-16 ${tint ? "bg-slate-50" : ""}`}
    >
      <Container>
        <Reveal>
          <h2 className="text-xl font-bold uppercase tracking-tight text-primary sm:text-2xl">
            {title}
          </h2>
          <span className="mt-3 block h-1 w-16 rounded-full bg-gold" />
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {members.map((m, i) => (
            <Reveal key={m.name} delay={i * 40}>
              <BoardMemberCard member={m} roleLabel={roleLabel(m.role)} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
