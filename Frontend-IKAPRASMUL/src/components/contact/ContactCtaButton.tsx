"use client";

import { Button } from "@/components/ui/button";
import type { InquirySubject } from "@/constants/categories";
import { useContactModalStore } from "@/stores/contactModalStore";

type ContactCtaButtonProps = React.ComponentProps<typeof Button> & {
  /** Pre-fills the contact modal subject (e.g. "Create a SIG"). */
  subject?: InquirySubject;
};

// Opens the global "Get in Touch" modal. Use for every CTA that looks like a
// contribution (Create a SIG / List Your Business / Submit Your Story / Contact
// Alumni Network) — they are inquiries, not direct content writes.
export function ContactCtaButton({
  subject,
  children,
  ...props
}: ContactCtaButtonProps) {
  const open = useContactModalStore((s) => s.open);
  return (
    <Button onClick={() => open(subject)} {...props}>
      {children}
    </Button>
  );
}
