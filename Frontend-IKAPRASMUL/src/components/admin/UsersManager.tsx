"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Pencil,
  KeyRound,
  Trash2,
  ShieldCheck,
  Shield,
  Loader2,
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { client } from "@/lib/api";
import { useLang } from "@/components/shared/LanguageProvider";
import type { AdminUser } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const ALL_SECTIONS = [
  { key: "sig", labelKey: "sigGroups" as const },
  { key: "business", labelKey: "alumniBusiness" as const },
  { key: "stories", labelKey: "alumniStories" as const },
  { key: "news", labelKey: "newsInsights" as const },
  { key: "events", labelKey: "events" as const },
] as const;

interface UsersManagerProps {
  users: AdminUser[];
  isSuperAdmin: boolean;
}

type DialogMode =
  | { kind: "create" }
  | { kind: "permissions"; user: AdminUser }
  | { kind: "password"; user: AdminUser }
  | { kind: "delete"; user: AdminUser }
  | null;

function SectionToggle({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const { t } = useLang();
  return (
    <div className="flex flex-wrap gap-2">
      {ALL_SECTIONS.map(({ key, labelKey }) => {
        const active = selected.includes(key);
        return (
          <button
            key={key}
            type="button"
            onClick={() =>
              onChange(
                active ? selected.filter((s) => s !== key) : [...selected, key],
              )
            }
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/60 hover:text-foreground",
            )}
          >
            {t.admin[labelKey]}
          </button>
        );
      })}
    </div>
  );
}

export function UsersManager({ users: initial, isSuperAdmin }: UsersManagerProps) {
  const { t } = useLang();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [dialog, setDialog] = useState<DialogMode>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Create form state
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createConfirm, setCreateConfirm] = useState("");
  const [createSections, setCreateSections] = useState<string[]>([]);

  // Edit permissions state
  const [editSections, setEditSections] = useState<string[]>([]);

  // Change password state
  const [newPassword, setNewPassword] = useState("");
  const [newConfirm, setNewConfirm] = useState("");

  // Search + pagination
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const refresh = () => startTransition(() => router.refresh());

  const closeDialog = () => {
    setDialog(null);
    setCreateEmail("");
    setCreatePassword("");
    setCreateConfirm("");
    setCreateSections([]);
    setNewPassword("");
    setNewConfirm("");
  };

  const openEditPermissions = (user: AdminUser) => {
    setEditSections([...user.permissions]);
    setDialog({ kind: "permissions", user });
  };

  const handleCreate = async () => {
    if (!createEmail.trim() || !createPassword) return;
    if (createPassword !== createConfirm) {
      toast.error(t.admin.passwordMismatch);
      return;
    }
    setIsSaving(true);
    try {
      await client.post("/api/admin/users", {
        email: createEmail.trim(),
        password: createPassword,
        permissions: createSections,
      });
      toast.success(t.admin.adminCreated);
      closeDialog();
      refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePermissions = async () => {
    if (dialog?.kind !== "permissions") return;
    setIsSaving(true);
    try {
      await client.patch(`/api/admin/users/${dialog.user.id}/permissions`, {
        permissions: editSections,
      });
      toast.success(t.admin.permissionsSaved);
      closeDialog();
      refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (dialog?.kind !== "password") return;
    if (newPassword !== newConfirm) {
      toast.error(t.admin.passwordMismatch);
      return;
    }
    setIsSaving(true);
    try {
      await client.patch(`/api/admin/users/${dialog.user.id}/password`, {
        newPassword,
      });
      toast.success(t.admin.passwordChanged);
      closeDialog();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (dialog?.kind !== "delete") return;
    setIsSaving(true);
    try {
      await client.delete(`/api/admin/users/${dialog.user.id}`);
      toast.success(t.admin.adminDeleted);
      closeDialog();
      refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error");
    } finally {
      setIsSaving(false);
    }
  };

  // Stat counts always use the full unfiltered list
  const superAdminCount = initial.filter((u) => u.role === "SuperAdmin").length;
  const adminCount = initial.filter((u) => u.role === "Admin").length;

  // Search filter + pagination
  const filtered = query.trim()
    ? initial.filter((u) =>
        u.email.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : initial;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            {t.admin.userManagement}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {t.admin.userManagementSubtitle}
          </p>
        </div>
        {isSuperAdmin && (
          <Button
            variant="gold"
            size="sm"
            onClick={() => setDialog({ kind: "create" })}
          >
            <Plus className="size-4" />
            {t.admin.addAdmin}
          </Button>
        )}
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <Card className="gap-0 p-5">
          <div className="flex items-center justify-between">
            <span className="grid size-10 place-items-center rounded-lg bg-primary/5 text-primary">
              <ShieldCheck className="size-5" />
            </span>
            <span className="text-3xl font-bold text-primary">{superAdminCount}</span>
          </div>
          <p className="mt-4 text-sm font-semibold text-foreground">
            {t.admin.superAdminBadge}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {t.admin.fullAccess}
          </p>
        </Card>
        <Card className="gap-0 p-5">
          <div className="flex items-center justify-between">
            <span className="grid size-10 place-items-center rounded-lg bg-primary/5 text-primary">
              <Users className="size-5" />
            </span>
            <span className="text-3xl font-bold text-primary">{adminCount}</span>
          </div>
          <p className="mt-4 text-sm font-semibold text-foreground">
            {t.admin.adminBadge}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {t.admin.sectionRestricted}
          </p>
        </Card>
      </div>

      {/* Search bar */}
      <div className="mt-4 relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder={`${t.admin.adminEmail}…`}
          className="pl-9"
        />
      </div>

      {/* User list */}
      <Card className="mt-3 gap-0 overflow-hidden p-0 border-0 shadow-md">
        {filtered.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-muted-foreground">
            {initial.length === 0 ? t.admin.noAdminsYet : t.admin.noUserResults}
          </p>
        ) : (
          paginated.map((user, idx) => {
            const isSA = user.role === "SuperAdmin";
            return (
              <div
                key={user.id}
                className={cn(
                  "flex flex-col gap-3 bg-white px-6 py-4 sm:flex-row sm:items-center sm:gap-4",
                  idx < paginated.length - 1 && "border-b border-slate-100",
                )}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {isSA ? (
                      <ShieldCheck className="size-4 shrink-0 text-primary" />
                    ) : (
                      <Shield className="size-4 shrink-0 text-muted-foreground" />
                    )}
                    <span className="text-sm font-semibold text-foreground">
                      {user.email}
                    </span>
                    <Badge
                      variant={isSA ? "default" : "outline"}
                      className="text-xs"
                    >
                      {isSA ? t.admin.superAdminBadge : t.admin.adminBadge}
                    </Badge>
                  </div>

                  {!isSA && (
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {user.permissions.length === 0 ? (
                        <span className="text-xs text-muted-foreground">
                          {t.admin.noPermissionsSet}
                        </span>
                      ) : (
                        user.permissions.map((perm) => {
                          const section = ALL_SECTIONS.find((s) => s.key === perm);
                          return (
                            <Badge key={perm} variant="secondary" className="text-xs">
                              {section ? t.admin[section.labelKey] : perm}
                            </Badge>
                          );
                        })
                      )}
                    </div>
                  )}

                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {t.admin.createdAt}: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions — SuperAdmin can manage normal admins; normal admins see nothing */}
                {isSuperAdmin && !isSA ? (
                  <div className="flex shrink-0 gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditPermissions(user)}
                      title={t.admin.editPermissions}
                    >
                      <Pencil className="size-4" />
                      <span className="hidden sm:inline">{t.admin.editPermissions}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setNewPassword("");
                        setNewConfirm("");
                        setDialog({ kind: "password", user });
                      }}
                      title={t.admin.changePassword}
                    >
                      <KeyRound className="size-4" />
                      <span className="hidden sm:inline">{t.admin.changePassword}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDialog({ kind: "delete", user })}
                      className="text-destructive hover:text-destructive"
                      title={t.admin.delete}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ) : (
                  !isSuperAdmin && (
                    <Badge variant="outline" className="shrink-0 text-xs text-muted-foreground">
                      {t.admin.readOnly}
                    </Badge>
                  )
                )}
              </div>
            );
          })
        )}

        {/* Pagination footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 bg-white px-6 py-4">
            <span className="text-sm text-muted-foreground">
              {t.admin.page} {safePage} {t.admin.of} {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
              >
                <ChevronLeft className="size-4" />
                {t.admin.previous}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
              >
                {t.admin.next}
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Create admin dialog */}
      <Dialog open={dialog?.kind === "create"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" />
              {t.admin.addAdmin}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="create-email">{t.admin.adminEmail} *</Label>
              <Input
                id="create-email"
                type="email"
                value={createEmail}
                onChange={(e) => setCreateEmail(e.target.value)}
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="create-password">{t.admin.adminPassword} *</Label>
              <PasswordInput
                id="create-password"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="create-confirm">{t.admin.confirmPassword} *</Label>
              <PasswordInput
                id="create-confirm"
                value={createConfirm}
                onChange={(e) => setCreateConfirm(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label>{t.admin.sectionPermissions}</Label>
              <SectionToggle
                selected={createSections}
                onChange={setCreateSections}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={closeDialog} disabled={isSaving}>
              {t.admin.cancel}
            </Button>
            <Button
              variant="gold"
              onClick={handleCreate}
              disabled={isSaving || !createEmail || !createPassword || !createConfirm}
            >
              {isSaving ? <Loader2 className="animate-spin" /> : t.admin.create}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit permissions dialog */}
      <Dialog
        open={dialog?.kind === "permissions"}
        onOpenChange={(open) => !open && closeDialog()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.admin.editPermissions}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-sm text-muted-foreground">
              {dialog?.kind === "permissions" ? dialog.user.email : ""}
            </p>
            <SectionToggle selected={editSections} onChange={setEditSections} />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={closeDialog} disabled={isSaving}>
              {t.admin.cancel}
            </Button>
            <Button variant="gold" onClick={handleSavePermissions} disabled={isSaving}>
              {isSaving ? <Loader2 className="animate-spin" /> : t.admin.saveChanges}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change password dialog */}
      <Dialog
        open={dialog?.kind === "password"}
        onOpenChange={(open) => !open && closeDialog()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.admin.changePassword}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-muted-foreground">
              {dialog?.kind === "password" ? dialog.user.email : ""}
            </p>
            <div className="space-y-1.5">
              <Label htmlFor="new-password">{t.admin.newPassword} *</Label>
              <PasswordInput
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-confirm">{t.admin.confirmPassword} *</Label>
              <PasswordInput
                id="new-confirm"
                value={newConfirm}
                onChange={(e) => setNewConfirm(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={closeDialog} disabled={isSaving}>
              {t.admin.cancel}
            </Button>
            <Button
              variant="gold"
              onClick={handleChangePassword}
              disabled={isSaving || !newPassword || !newConfirm}
            >
              {isSaving ? <Loader2 className="animate-spin" /> : t.admin.saveChanges}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog
        open={dialog?.kind === "delete"}
        onOpenChange={(open) => !open && closeDialog()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.admin.deleteTitle}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {t.admin.deleteDescBefore}{" "}
            <span className="font-semibold text-foreground">
              {dialog?.kind === "delete" ? dialog.user.email : ""}
            </span>
            {t.admin.deleteDescAfter}
          </p>
          <DialogFooter>
            <Button variant="ghost" onClick={closeDialog} disabled={isSaving}>
              {t.admin.cancel}
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isSaving}>
              {isSaving ? <Loader2 className="animate-spin" /> : t.admin.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
