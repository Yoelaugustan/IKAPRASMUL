import { Container } from "./Container";
import { Logo } from "./Logo";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { getServerDict } from "@/i18n/server";
import {
  Building2Icon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  SpotifyIcon,
  YoutubeIcon,
} from "@/components/icons";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ikaprasmul/", Icon: LinkedinIcon },
  { label: "Instagram", href: "https://www.instagram.com/alumniprasmul?igsh=N3ZnNGx0dzRtMG9y", Icon: InstagramIcon },
  { label: "YouTube", href: "https://youtube.com/@ikapramaprasetiyamulya?si=LQSjDLmGWhg76Uo1", Icon: YoutubeIcon },
  { label: "Spotify", href: "https://open.spotify.com/show/2TV53T3kSDvVNH6WcnMsTx?si=7Bl65LKeQHiyXeiSsQGauA", Icon: SpotifyIcon },
];

const CAMPUSES = [
  {
    name: "Universitas Prasetiya Mulya - BSD Campus",
    address:
      "Edu Town Kavling Edu I No. 1, Jalan BSD Raya Barat 1, Serpong, Pagedangan, Kec. Pagedangan, Kabupaten Tangerang, Banten 15339",
  },
  {
    name: "Universitas Prasetiya Mulya - Cilandak Campus",
    address:
      "Jl. R.A. Kartini, RT.14/RW.6, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430",
  },
];

// `tel` is the dial-able number (null = not call-able, e.g. fax).
const PHONES = [
  { label: null, display: "(+62 21) 751-1126", tel: "+62217511126" },
  { label: null, display: "(+62 21) 750-0463", tel: "+62217500463" },
  { label: null, display: "(+62 21) 765-7257", tel: "+62217657257" },
  { label: "Fax", display: "(+62 21) 751-1128", tel: null },
  { label: "Mobile", display: "0813 7190 8225", tel: "+6281371908225" },
];

export async function SiteFooter() {
  const { t } = await getServerDict();
  return (
    <footer className="border-t-3 border-gold bg-primary-dark text-primary-foreground">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1.4fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <Logo variant="inverted" />
            <p className="mt-6 max-w-xs text-sm leading-6 text-primary-foreground/70">
              {t.footer.brandDesc}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              {t.footer.contactHeading}
            </h3>
            <ul className="mt-5 space-y-5 text-sm">
              {CAMPUSES.map((c) => (
                <li key={c.name} className="flex gap-3">
                  <Building2Icon className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span>
                    <span className="font-semibold text-primary-foreground">
                      {c.name}
                    </span>
                    <br />
                    <span className="text-xs leading-5 text-primary-foreground/50">
                      {c.address}
                    </span>
                  </span>
                </li>
              ))}
              <li className="flex gap-3">
                <PhoneIcon className="mt-0.5 size-4 shrink-0 text-gold" />
                <span className="space-y-1">
                  {PHONES.map((p) => (
                    <span key={p.display} className="block">
                      {p.label && (
                        <span className="text-primary-foreground/50">
                          {p.label}:{" "}
                        </span>
                      )}
                      {p.tel ? (
                        <a
                          href={`tel:${p.tel}`}
                          className="text-primary-foreground/80 hover:text-gold"
                        >
                          {p.display}
                        </a>
                      ) : (
                        <span className="text-primary-foreground/80">
                          {p.display}
                        </span>
                      )}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="size-4 shrink-0 text-gold" />
                <a
                  href="mailto:ikaprasmul@prasetiyamulya.ac.id"
                  className="text-primary-foreground/80 hover:text-gold"
                >
                  ikaprasmul@prasetiyamulya.ac.id
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              {t.footer.followHeading}
            </h3>
            <p className="mt-5 text-sm text-primary-foreground/70">
              {t.footer.followText}
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  className="grid size-10 place-items-center rounded-full bg-white/5 text-primary-foreground/80 transition-colors hover:bg-gold hover:text-gold-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              {t.footer.newsletterHeading}
            </h3>
            <p className="mt-5 text-sm text-primary-foreground/70">
              {t.footer.newsletterText}
            </p>
            <div className="mt-4">
              <NewsletterForm variant="footer" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-primary-foreground/60 sm:flex-row">
          <p>{t.footer.rights}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">
              {t.footer.privacy}
            </a>
            <a href="#" className="hover:text-gold">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
