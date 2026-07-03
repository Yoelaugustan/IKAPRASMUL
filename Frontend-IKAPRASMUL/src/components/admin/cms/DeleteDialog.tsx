"use client";

import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/shared/LanguageProvider";

export function DeleteDialog({
  open,
  name,
  onClose,
  onConfirm,
}: {
  open: boolean;
  name: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}) {
  const { t } = useLang();
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      await onConfirm();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && !deleting && onClose()}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <div className="grid size-11 place-items-center rounded-xl bg-destructive/10 text-destructive">
          <AlertTriangle className="size-5" />
        </div>
        <DialogTitle className="text-lg">{t.admin.deleteTitle}</DialogTitle>
        <DialogDescription>
          {t.admin.deleteDescBefore}{" "}
          <span className="font-semibold text-foreground">{name}</span>
          {t.admin.deleteDescAfter}
        </DialogDescription>
        <div className="mt-2 flex justify-end gap-2.5">
          <Button variant="outline" disabled={deleting} onClick={onClose}>
            {t.admin.cancel}
          </Button>
          <Button variant="destructive" disabled={deleting} onClick={() => void handleConfirm()}>
            {deleting && <Loader2 className="mr-1.5 size-3.5 animate-spin" />}
            {deleting ? t.admin.deletingOverlayTitle : t.admin.delete}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
