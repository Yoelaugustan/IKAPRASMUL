"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ImagePlus, Loader2, X } from "lucide-react";
import { SendMessageIcon } from "@/components/icons";
import { makeContactSchema, type ContactInput } from "@/types/schemas";
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
import { useLang } from "@/components/shared/LanguageProvider";
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
  const { t } = useLang();
  const schema = useMemo(() => makeContactSchema(t.validation), [t]);
  const form = useForm<ContactInput>({
    resolver: zodResolver(schema),
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
      toast.error(t.contact.imageTypeError);
      e.target.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      toast.error(t.contact.imageSizeError);
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
        toast.success(t.contact.toastSuccess);
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
      onError: () => toast.error(t.contact.toastError),
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
                <FormLabel className={labelClass}>
                  {t.contact.fullName}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.contact.fullNamePlaceholder}
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
                <FormLabel className={labelClass}>
                  {t.contact.emailAddress}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t.contact.emailPlaceholder}
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
              <FormLabel className={labelClass}>{t.contact.subject}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full bg-[#FBF9F8]">
                    <SelectValue placeholder={t.contact.subjectPlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {INQUIRY_SUBJECTS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {t.contact.subjects[s] ?? s}
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
              <FormLabel className={labelClass}>{t.contact.message}</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder={t.contact.messagePlaceholder}
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
          <p className={labelClass}>{t.contact.attachment}</p>
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
              {t.contact.addImage}
            </label>
          ) : (
            <div className="mt-2 flex items-center gap-3 rounded-md border border-[#001B3D]/15 bg-[#FBF9F8] p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageData}
                alt={t.contact.attachmentPreview}
                className="size-12 shrink-0 rounded object-cover"
              />
              <span className="min-w-0 flex-1 truncate text-sm text-[#001B3D]">
                {imageName ?? t.contact.selectedImage}
              </span>
              <button
                type="button"
                onClick={clearImage}
                aria-label={t.contact.removeImage}
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
              {t.contact.sendMessage}
              <SendMessageIcon className="size-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
