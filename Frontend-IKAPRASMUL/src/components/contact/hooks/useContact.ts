import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { ContactInput } from "@/types/schemas";

// Submits the "Get in Touch" inquiry through the BFF route (`/api/contact`),
// which forwards to the .NET backend (stores it + emails the admin, with the
// optional image as an attachment).
async function sendInquiry(input: ContactInput): Promise<{ message?: string }> {
  const { data } = await axios.post<{ message?: string }>("/api/contact", input);
  return data;
}

export function useContact() {
  return useMutation({ mutationFn: sendInquiry });
}
