"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/types/schemas";
import { INQUIRY_SUBJECTS, type InquirySubject } from "@/constants/categories";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContact } from "../hooks/useContact";

export function ContactForm({
  defaultSubject,
  onSuccess,
}: {
  defaultSubject?: InquirySubject;
  onSuccess?: () => void;
}) {
  const sendInquiry = useContact();
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: defaultSubject ?? "General Inquiry",
      message: "",
    },
  });

  // Keep the subject in sync when the modal is opened from a CTA.
  useEffect(() => {
    if (defaultSubject) form.setValue("subject", defaultSubject);
  }, [defaultSubject, form]);

  const onSubmit = (data: ContactInput) => {
    sendInquiry.mutate(data, {
      onSuccess: () => {
        toast.success("Thanks! Your message has been sent.");
        form.reset({
          fullName: "",
          email: "",
          subject: defaultSubject ?? "General Inquiry",
          message: "",
        });
        onSuccess?.();
      },
      onError: () => toast.error("Couldn't send your message. Please try again."),
    });
  };

  const labelClass =
    "text-xs font-bold uppercase tracking-wide text-[#001B3D]";
  const fieldClass = "bg-[#FBF9F8]";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    autoComplete="name"
                    className={fieldClass}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    className={fieldClass}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Subject</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full bg-[#FBF9F8]">
                    <SelectValue placeholder="Choose a subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {INQUIRY_SUBJECTS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Message</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="How can we help you today?"
                  className={fieldClass}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="default"
          className="h-12 w-full bg-[#001B3D] text-[13px] font-bold uppercase tracking-wide text-white hover:bg-[#00132b]"
          disabled={sendInquiry.isPending}
        >
          {sendInquiry.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              Send Message
              <svg viewBox="0 0 8 10" className="size-2.5 fill-current" aria-hidden>
                <path d="M0 0l8 5-8 5z" />
              </svg>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
