"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" autoComplete="name" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
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
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="How can the alumni network help?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="gold"
          className="w-full"
          disabled={sendInquiry.isPending}
        >
          {sendInquiry.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              Send message <Send />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
