import { SiteHeader } from "@/components/layouts/SiteHeader";
import { SiteFooter } from "@/components/layouts/SiteFooter";
import { ContactModal } from "@/components/contact/ContactModal";

// Public site chrome: sticky header, footer, and the global "Get in Touch"
// modal (mounted once here so every public page can open it).
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <ContactModal />
    </>
  );
}
