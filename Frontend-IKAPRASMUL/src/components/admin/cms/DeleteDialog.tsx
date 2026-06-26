"use client";

import { AlertTriangle } from "lucide-react";
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
  onConfirm: () => void;
}) {
  const { t } = useLang();

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
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
          <Button variant="outline" onClick={onClose}>
            {t.admin.cancel}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {t.admin.delete}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
