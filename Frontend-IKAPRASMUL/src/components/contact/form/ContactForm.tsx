"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ImagePlus, Loader2, X } from "lucide-react";
import { SendMessageIcon } from "@/components/icons";
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

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

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

  // Bumping this key remounts the file input, which clears its selected file.
  const [fileKey, setFileKey] = useState(0);
  const imageData = useWatch({ control: form.control, name: "image" });
  const imageName = useWatch({ control: form.control, name: "imageName" });

  const clearImage = () => {
    form.setValue("image", undefined);
    form.setValue("imageName", undefined);
    setFileKey((k) => k + 1);
  };

  const onPickImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Please choose a JPG, PNG, or WebP image.");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      toast.error("Image must be 5 MB or smaller.");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      form.setValue("image", reader.result as string);
      form.setValue("imageName", file.name);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: ContactInput) => {
    sendInquiry.mutate(data, {
      onSuccess: () => {
        toast.success("Thanks! Your message has been sent.");
        form.reset({
          fullName: "",
          email: "",
          subject: defaultSubject ?? "General Inquiry",
          message: "",
          image: undefined,
          imageName: undefined,
        });
        setFileKey((k) => k + 1);
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
        {/* Optional image attachment */}
        <div>
          <p className={labelClass}>Attachment (optional)</p>
          <input
            key={fileKey}
            id="contact-image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={onPickImage}
            className="hidden"
          />
          {!imageData ? (
            <label
              htmlFor="contact-image"
              className="mt-2 flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-[#001B3D]/25 bg-[#FBF9F8] px-3 py-2.5 text-sm text-[#001B3D]/70 transition-colors hover:border-[#805600]/50 hover:text-[#805600]"
            >
              <ImagePlus className="size-4 shrink-0" />
              Add an image - JPG, PNG, or WebP (max 5&nbsp;MB)
            </label>
          ) : (
            <div className="mt-2 flex items-center gap-3 rounded-md border border-[#001B3D]/15 bg-[#FBF9F8] p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageData}
                alt="Attachment preview"
                className="size-12 shrink-0 rounded object-cover"
              />
              <span className="min-w-0 flex-1 truncate text-sm text-[#001B3D]">
                {imageName ?? "Selected image"}
              </span>
              <button
                type="button"
                onClick={clearImage}
                aria-label="Remove image"
                className="grid size-7 shrink-0 place-items-center rounded-full text-[#001B3D]/60 transition-colors hover:bg-[#001B3D]/5 hover:text-[#001B3D]"
              >
                <X className="size-4" />
              </button>
            </div>
          )}
        </div>

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
              <SendMessageIcon className="size-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
