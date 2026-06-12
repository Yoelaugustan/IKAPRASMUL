"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useContactModalStore } from "@/stores/contactModalStore";
import { ContactForm } from "./form/ContactForm";

const CAMPUSES = [
  { name: "BSD Campus", address: "Jl. BSD Raya Utama, BSD City, Tangerang 15339" },
  {
    name: "Cilandak Campus",
    address: "Jl. R.A. Kartini (TB Simatupang), Cilandak, Jakarta 12430",
  },
];

// Global "Get in Touch" modal. Mounted once in the root layout; opened from the
// header and from CTA buttons (with a pre-filled subject) via the Zustand store.
export function ContactModal() {
  const { isOpen, subject, setOpen, close } = useContactModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="max-h-[92vh] gap-0 overflow-y-auto p-0 sm:max-w-3xl">
        <div className="grid md:grid-cols-2">
          {/* Left: contact details */}
          <aside className="hidden flex-col justify-between bg-primary p-8 text-primary-foreground md:flex">
            <div>
              <DialogHeader className="space-y-2 text-left">
                <DialogTitle className="text-2xl text-primary-foreground">
                  Get in Touch
                </DialogTitle>
                <DialogDescription className="text-primary-foreground/70">
                  Have a question, an idea, or want to list a business, share a
                  story, or start a SIG? Send us a message and the alumni network
                  will follow up.
                </DialogDescription>
              </DialogHeader>
              <ul className="mt-8 space-y-5 text-sm">
                {CAMPUSES.map((c) => (
                  <li key={c.name} className="flex gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                    <span className="text-primary-foreground/80">
                      <span className="font-semibold text-primary-foreground">
                        {c.name}
                      </span>
                      <br />
                      {c.address}
                    </span>
                  </li>
                ))}
                <li className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-gold" />
                  <span className="text-primary-foreground/80">
                    +62 21 1234 567
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-gold" />
                  <span className="text-primary-foreground/80">
                    alumni@prasmul.ac.id
                  </span>
                </li>
              </ul>
            </div>
          </aside>

          {/* Right: form */}
          <div className="p-6 sm:p-8">
            {/* Mobile header (left panel hidden on small screens) */}
            <DialogHeader className="mb-6 space-y-2 text-left md:hidden">
              <DialogTitle className="text-2xl">Get in Touch</DialogTitle>
              <DialogDescription>
                Send us a message and the alumni network will follow up.
              </DialogDescription>
            </DialogHeader>
            <ContactForm defaultSubject={subject} onSuccess={close} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
