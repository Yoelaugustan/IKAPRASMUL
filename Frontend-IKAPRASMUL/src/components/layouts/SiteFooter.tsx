import { Container } from "./Container";
import { Logo } from "./Logo";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
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
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "YouTube", href: "#", Icon: YoutubeIcon },
  { label: "Spotify", href: "#", Icon: SpotifyIcon },
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
      "Edu Town Kavling Edu I No. 1, Jalan BSD Raya Barat 1, Serpong, Pagedangan, Kec. Pagedangan, Kabupaten Tangerang, Banten 15339",
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t-3 border-gold bg-primary-dark text-primary-foreground">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1.4fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <Logo variant="inverted" />
            <p className="mt-6 max-w-xs text-sm leading-6 text-primary-foreground/70">
              The official alumni association of Universitas Prasetiya Mulya,
              dedicated to fostering lifelong connections and professional
              growth.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Contact Us
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
              <li className="flex items-center gap-3">
                <PhoneIcon className="size-4 shrink-0 text-gold" />
                <a
                  href="tel:+622130450500"
                  className="text-primary-foreground/80 hover:text-gold"
                >
                  +62 21 304 50 500
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="size-4 shrink-0 text-gold" />
                <a
                  href="mailto:alumni@prasetiyamulya.ac.id"
                  className="text-primary-foreground/80 hover:text-gold"
                >
                  alumni@prasetiyamulya.ac.id
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Follow Us
            </h3>
            <p className="mt-5 text-sm text-primary-foreground/70">
              Stay connected with IKAPRASMUL
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
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
              Newsletter
            </h3>
            <p className="mt-5 text-sm text-primary-foreground/70">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="mt-4">
              <NewsletterForm variant="footer" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-primary-foreground/60 sm:flex-row">
          <p>© 2024 IKAPRASMUL. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold">
              Terms of Service
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
