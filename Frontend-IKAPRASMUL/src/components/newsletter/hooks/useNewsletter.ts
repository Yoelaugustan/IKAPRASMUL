import { useMutation } from "@tanstack/react-query";
import type { NewsletterInput } from "@/types/schemas";

// Simulated newsletter subscribe. Swap the mutationFn for the real
// `POST /api/newsletter` (BFF) call when the backend is wired.
async function subscribe(input: NewsletterInput): Promise<{ ok: true }> {
  await new Promise((r) => setTimeout(r, 700));
  console.info("[dummy] newsletter subscribe:", input.email);
  return { ok: true };
}

export function useNewsletter() {
  return useMutation({ mutationFn: subscribe });
}
