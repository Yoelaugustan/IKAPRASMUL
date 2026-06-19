"use client";

import { X } from "lucide-react";
import { Building2Icon, MailIcon, PhoneIcon } from "@/components/icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useContactModalStore } from "@/stores/contactModalStore";
import { useLang } from "@/components/shared/LanguageProvider";
import { ContactForm } from "./form/ContactForm";

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

// Global "Get in Touch" modal. Mounted once in the root layout; opened from the
// header and from CTA buttons (with a pre-filled subject) via the Zustand store.
export function ContactModal() {
  const { isOpen, subject, setOpen, close } = useContactModalStore();
  const { t } = useLang();

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[92vh] gap-0 overflow-y-auto border-0 p-0 sm:max-w-4xl"
      >
        {/* Navy header bar — sticky so the title and the close button stay
            reachable while scrolling the form on mobile. */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-[#001B3D] px-6 py-5 shadow-sm sm:px-8">
          <DialogTitle className="text-xl font-bold text-white">
            {t.contact.getInTouch}
          </DialogTitle>
          <DialogClose className="text-white/80 transition-colors hover:text-white focus:outline-none">
            <X className="size-5" />
            <span className="sr-only">{t.contact.close}</span>
          </DialogClose>
        </div>
        <DialogDescription className="sr-only">
          {t.contact.modalDesc}
        </DialogDescription>

        <div className="grid md:grid-cols-[5fr_7fr]">
          {/* Left: contact details */}
          <aside className="bg-[#F5F3F3] p-6 sm:p-8">
            <ul className="space-y-6">
              {CAMPUSES.map((c) => (
                <li key={c.name} className="flex gap-3">
                  <Building2Icon className="mt-0.5 size-5 shrink-0 text-[#805600]" />
                  <div>
                    <p className="text-[13px] font-bold uppercase tracking-wide text-[#001B3D]">
                      {c.name}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
                      {c.address}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="my-7 h-px bg-[#001B3D]/10" />

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-[#8056001A] text-[#805600]">
                  <PhoneIcon className="size-[18px]" />
                </span>
                <a
                  href="tel:+6281371908225"
                  className="text-sm font-semibold text-[#001B3D] transition-colors hover:text-[#805600]"
                >
                  +62 813 7190 8225
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-[#8056001A] text-[#805600]">
                  <MailIcon className="size-[18px]" />
                </span>
                <a
                  href="mailto:ikaprasmul@prasetiyamulya.ac.id"
                  className="text-sm font-semibold text-[#001B3D] transition-colors hover:text-[#805600]"
                >
                  ikaprasmul@prasetiyamulya.ac.id
                </a>
              </li>
            </ul>
          </aside>

          {/* Right: form */}
          <div className="bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-[#001B3D]">
              {t.contact.sendAMessage}
            </h2>
            <div className="mt-6">
              <ContactForm defaultSubject={subject} onSuccess={close} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
