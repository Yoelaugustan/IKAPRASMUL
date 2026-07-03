"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/shared/LanguageProvider";
import { toast } from "sonner";

export function SendNewsletterDialog({
  open,
  title,
  onClose,
  onSend,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  onSend: () => Promise<{ sentCount: number; subscriberCount: number }>;
}) {
  const { t } = useLang();
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    setSending(true);
    try {
      const { sentCount, subscriberCount } = await onSend();
      toast.success(
        `${t.admin.newsletterSentToast} (${sentCount}/${subscriberCount})`,
      );
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t.admin.newsletterSendErrorToast,
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && !sending && onClose()}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        {sending && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-3 rounded-lg bg-white/85 backdrop-blur-[1px]">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="text-sm font-semibold text-foreground">
              {t.admin.sendingNewsletter}
            </p>
          </div>
        )}
        <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
          <Send className="size-5" />
        </div>
        <DialogTitle className="text-lg">{t.admin.sendNewsletterTitle}</DialogTitle>
        <DialogDescription>
          {t.admin.sendNewsletterDescBefore}{" "}
          <span className="font-semibold text-foreground">{title}</span>
          {t.admin.sendNewsletterDescAfter}
        </DialogDescription>
        <div className="mt-2 flex justify-end gap-2.5">
          <Button variant="outline" disabled={sending} onClick={onClose}>
            {t.admin.notNow}
          </Button>
          <Button disabled={sending} onClick={() => void handleSend()}>
            {sending && <Loader2 className="mr-1.5 size-3.5 animate-spin" />}
            {t.admin.sendToAll}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
