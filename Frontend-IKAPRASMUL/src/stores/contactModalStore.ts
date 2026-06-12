import { create } from "zustand";
import type { InquirySubject } from "@/constants/categories";

// Global "Get in Touch" modal state. The modal is mounted once in the root
// layout and opened from the header and from the CTA buttons (Create a SIG,
// List Your Business, Submit Your Story, Contact Alumni Network) with a
// pre-filled subject.
type ContactModalState = {
  isOpen: boolean;
  subject?: InquirySubject;
  open: (subject?: InquirySubject) => void;
  close: () => void;
  setOpen: (open: boolean) => void;
};

export const useContactModalStore = create<ContactModalState>((set) => ({
  isOpen: false,
  subject: undefined,
  open: (subject) => set({ isOpen: true, subject }),
  close: () => set({ isOpen: false }),
  setOpen: (isOpen) => set({ isOpen }),
}));
