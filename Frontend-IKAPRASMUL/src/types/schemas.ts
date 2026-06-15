import { z } from "zod";
import { INQUIRY_SUBJECTS } from "@/constants/categories";

// Public forms only — Contact ("Get in Touch") and Newsletter.
// These zod schemas are the single source of truth shared by the form and any
// Server Action / route handler, and must be mirrored server-side (FluentValidation).

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Name is too long."),
  email: z.email("Enter a valid email address.").max(254),
  subject: z.enum(INQUIRY_SUBJECTS, {
    message: "Please choose a subject.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(2000, "Message is too long (2000 characters max)."),
  // Optional attachment: a base64 data URL. Type/size are validated client-side
  // before encoding; the cap here (~5 MB binary) is a backstop. Re-validated
  // server-side (FluentValidation).
  image: z.string().max(7_000_000, "Image is too large.").optional(),
  imageName: z.string().max(255).optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.email("Enter a valid email address.").max(254),
  consent: z.literal(true, {
    message: "Please accept to receive emails.",
  }),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const adminLoginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  remember: z.boolean().optional(),
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
