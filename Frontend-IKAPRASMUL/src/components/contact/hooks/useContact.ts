import { useMutation } from "@tanstack/react-query";
import type { ContactInput } from "@/types/schemas";

// Simulated "Get in Touch" inquiry submit. Swap for the real
// `POST /api/contact` (BFF → .NET inquiries inbox) when the backend is wired.
async function sendInquiry(input: ContactInput): Promise<{ ok: true }> {
  await new Promise((r) => setTimeout(r, 800));
  console.info("[dummy] contact inquiry:", input.subject, input.email);
  return { ok: true };
}

export function useContact() {
  return useMutation({ mutationFn: sendInquiry });
}
