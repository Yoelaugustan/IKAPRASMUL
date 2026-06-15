import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { NewsletterInput } from "@/types/schemas";

// Subscribes through the BFF route (`/api/newsletter`), which forwards to the
// .NET backend (stores the subscriber, de-duped). `source` tags where the signup
// came from (e.g. "footer" / "news").
export function useNewsletter(source?: string) {
  return useMutation({
    mutationFn: async (input: NewsletterInput): Promise<{ message?: string }> => {
      const { data } = await axios.post<{ message?: string }>("/api/newsletter", {
        email: input.email,
        source,
      });
      return data;
    },
  });
}
