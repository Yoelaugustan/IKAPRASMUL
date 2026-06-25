import { z } from "zod";
import { INQUIRY_SUBJECTS } from "@/constants/categories";

// Public forms only — Contact ("Get in Touch") and Newsletter.
// These zod schemas are the single source of truth shared by the form and any
// Server Action / route handler, and must be mirrored server-side (FluentValidation).

// Validation messages are passed in so the public forms can localize them (see
// src/i18n `validation`). The default English set keeps server-side use simple.
type ContactMessages = {
  nameMin: string;
  nameMax: string;
  email: string;
  subject: string;
  messageMin: string;
  messageMax: string;
  imageMax: string;
};

export const makeContactSchema = (m: ContactMessages) =>
  z.object({
    fullName: z.string().trim().min(2, m.nameMin).max(120, m.nameMax),
    email: z.email(m.email).max(254),
    subject: z.enum(INQUIRY_SUBJECTS, { message: m.subject }),
    message: z.string().trim().min(10, m.messageMin).max(2000, m.messageMax),
    // Optional attachment: a base64 data URL. Type/size are validated client-side
    // before encoding; the cap here (~5 MB binary) is a backstop. Re-validated
    // server-side (FluentValidation).
    image: z.string().max(7_000_000, m.imageMax).optional(),
    imageName: z.string().max(255).optional(),
  });

const DEFAULT_CONTACT_MESSAGES: ContactMessages = {
  nameMin: "Please enter your full name.",
  nameMax: "Name is too long.",
  email: "Enter a valid email address.",
  subject: "Please choose a subject.",
  messageMin: "Please write at least 10 characters.",
  messageMax: "Message is too long (2000 characters max).",
  imageMax: "Image is too large.",
};

export const contactSchema = makeContactSchema(DEFAULT_CONTACT_MESSAGES);
export type ContactInput = z.infer<typeof contactSchema>;

type NewsletterMessages = { email: string; consent: string };

export const makeNewsletterSchema = (m: NewsletterMessages) =>
  z.object({
    email: z.email(m.email).max(254),
    consent: z.literal(true, { message: m.consent }),
  });

export const newsletterSchema = makeNewsletterSchema({
  email: "Enter a valid email address.",
  consent: "Please accept to receive emails.",
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const adminLoginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid email address."),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
