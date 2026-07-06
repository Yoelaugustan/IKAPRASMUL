import { Building2, Globe, Mail, Phone, Share2 } from "lucide-react";
import { Container } from "@/components/layouts/Container";
import { Reveal } from "@/components/shared/Reveal";
import { SOCIALS } from "@/constants/socials";
import { getServerDict } from "@/i18n/server";

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=Universitas+Prasetiya+Mulya+BSD+City&output=embed";

export async function AboutContactSection() {
  const { t } = await getServerDict();
  const { contactSectionEyebrow, contactSectionTitle, contactLabels } = t.about;

  const infoCards = [
    {
      Icon: Building2,
      label: contactLabels.office,
      content: "Universitas Prasetiya Mulya, BSD City, Tangerang 15339",
    },
    {
      Icon: Mail,
      label: contactLabels.email,
      content: "ikaprasmul@prasetiyamulya.ac.id",
      href: "mailto:ikaprasmul@prasetiyamulya.ac.id",
    },
    {
      Icon: Globe,
      label: contactLabels.website,
      content: "ikaprasmul.id",
      href: "https://ikaprasmul.id",
    },
    {
      Icon: Phone,
      label: contactLabels.phone,
      content: "+62 21 304 50 500",
      href: "tel:+622130450500",
    },
  ];

  return (
    <section id="contact" className="scroll-mt-[150px] bg-slate-50 py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
            {contactSectionEyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
            {contactSectionTitle}
          </h2>
          <span className="mt-4 block h-1 w-16 rounded-full bg-gold" />
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
          <Reveal delay={80} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
            {infoCards.map(({ Icon, label, content, href }) => {
              const Wrapper = href ? "a" : "div";
              return (
                <Wrapper
                  key={label}
                  {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}
                  className="flex min-w-0 flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-6 text-center shadow-sm transition-colors hover:border-gold/40"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-gold">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-wide text-primary">
                    {label}
                  </p>
                  <p className="w-full break-words text-xs leading-relaxed text-muted-foreground">
                    {content}
                  </p>
                </Wrapper>
              );
            })}

            <div className="flex min-w-0 flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-6 text-center shadow-sm">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-gold">
                <Share2 className="size-5" strokeWidth={1.75} />
              </span>
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                {contactLabels.socialMedia}
              </p>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-white transition-colors hover:bg-gold hover:text-gold-foreground"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={140} className="overflow-hidden rounded-2xl shadow-sm">
            <iframe
              src={MAP_EMBED_SRC}
              title="Universitas Prasetiya Mulya location"
              loading="lazy"
              className="h-full min-h-[280px] w-full border-0"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
