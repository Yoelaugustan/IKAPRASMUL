"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { UserIcon } from "@/components/icons";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MAIN_NAV, ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "./Container";
import { useContactModalStore } from "@/stores/contactModalStore";
import { Logo } from "./Logo";

export function SiteHeader() {
  const pathname = usePathname();
  const openContact = useContactModalStore((s) => s.open);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === ROUTES.home ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/25 bg-primary text-primary-foreground">
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-3">
          <Link href={ROUTES.home} aria-label="IKAPRASMUL home" className="shrink-0">
            <Logo variant="inverted" />
          </Link>

          {/* Desktop nav — visible from 1100px */}
          <nav className="hidden items-center gap-5 min-[1100px]:flex">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative whitespace-nowrap py-1 text-[13px] font-medium text-primary-foreground/85 transition-colors hover:text-white",
                  isActive(item.href) &&
                    "text-gold after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-gold",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5">
            {/* <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              className="hidden text-primary-foreground hover:bg-white/10 hover:text-white sm:inline-flex"
            >
              <Search />
            </Button> */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden border-white/40 bg-transparent text-[13px] text-primary-foreground hover:bg-white/10 hover:text-white min-[1100px]:inline-flex"
            >
              <a href="https://alumniprofile.ikaprama.org/home" target="_blank">
                <UserIcon className="size-3.5" /> Login / Register
              </a>
            </Button>
            <Button
              variant="gold"
              size="sm"
              className="hidden text-[13px] min-[1100px]:inline-flex"
              onClick={() => openContact()}
            >
              Contact Us
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-white/10 hover:text-white min-[1100px]:hidden"
                  aria-label="Open menu"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 border-white/10 bg-primary text-primary-foreground"
              >
                <SheetHeader>
                  <SheetTitle>
                    <Logo variant="inverted" />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4">
                  {MAIN_NAV.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "rounded-md px-3 py-2.5 text-base font-medium text-primary-foreground/85 hover:bg-white/10 hover:text-white",
                        isActive(item.href) && "bg-white/10 text-gold",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-4 flex flex-col gap-2 px-4">
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-white"
                  >
                    <a href="https://alumniprofile.ikaprama.org/home" onClick={() => setMobileOpen(false)}>
                      <UserIcon /> Login / Register
                    </a>
                  </Button>
                  <Button
                    variant="gold"
                    onClick={() => {
                      setMobileOpen(false);
                      openContact();
                    }}
                  >
                    Contact Us
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
