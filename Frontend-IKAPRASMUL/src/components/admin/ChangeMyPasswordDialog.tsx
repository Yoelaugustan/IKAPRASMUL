"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { client } from "@/lib/api";
import { useLang } from "@/components/shared/LanguageProvider";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Self-service password change for the signed-in admin (including SuperAdmin,
// who can't be targeted by the "manage other admins" password reset in
// UsersManager). Hits its own endpoint (PATCH /api/admin/users/me/password)
// that identifies "self" from the JWT server-side — never passes a user id.
// Controlled from outside (the profile dropdown owns `open`) since the
// trigger lives in a menu item rather than a standalone button.
export function ChangeMyPasswordDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useLang();
  const [isSaving, setIsSaving] = useState(false);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");

  const close = () => {
    onOpenChange(false);
    setCurrent("");
    setNext("");
    setConfirm("");
  };

  const handleSubmit = async () => {
    if (next !== confirm) {
      toast.error(t.admin.passwordMismatch);
      return;
    }
    setIsSaving(true);
    try {
      await client.patch("/api/admin/users/me/password", {
        currentPassword: current,
        newPassword: next,
      });
      toast.success(t.admin.passwordChanged);
      close();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.admin.changeMyPassword}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="current-password">{t.admin.currentPassword} *</Label>
            <PasswordInput
              id="current-password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="my-new-password">{t.admin.newPassword} *</Label>
            <PasswordInput
              id="my-new-password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="my-new-confirm">{t.admin.confirmPassword} *</Label>
            <PasswordInput
              id="my-new-confirm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={close} disabled={isSaving}>
            {t.admin.cancel}
          </Button>
          <Button
            variant="gold"
            onClick={handleSubmit}
            disabled={isSaving || !current || !next || !confirm}
          >
            {isSaving ? <Loader2 className="animate-spin" /> : t.admin.saveChanges}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
