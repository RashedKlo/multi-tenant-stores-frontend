"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { FormField, SubmitButton, AlertBanner } from "@/shared/lib/ui/FormField";
import { changePasswordAction } from "../../../actions/change-password-action";

export function ChangePasswordForm() {
  const t = useTranslations("profile");
  const tAuth = useTranslations("auth");
  const [pending, startTransition] = useTransition();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      const result = await changePasswordAction({ currentPassword, newPassword });
      if (!result.success) {
        setError(tAuth(result.error as Parameters<typeof tAuth>[0]));
        return;
      }
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {error && <AlertBanner message={error} />}
      {success && <AlertBanner message={t("passwordChanged")} variant="success" />}
      <FormField name="currentPassword" type={showCurrent ? "text" : "password"} autoComplete="current-password" label={t("currentPassword")} value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required disabled={pending} trailing={<button type="button" onClick={() => setShowCurrent((value) => !value)} className="text-xs font-medium text-muted-foreground hover:text-foreground" tabIndex={-1}>{showCurrent ? tAuth("hidePassword") : tAuth("showPassword")}</button>} />
      <FormField name="newPassword" type={showNew ? "text" : "password"} autoComplete="new-password" label={t("newPassword")} hint={tAuth("passwordHint")} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required disabled={pending} trailing={<button type="button" onClick={() => setShowNew((value) => !value)} className="text-xs font-medium text-muted-foreground hover:text-foreground" tabIndex={-1}>{showNew ? tAuth("hidePassword") : tAuth("showPassword")}</button>} />
      <SubmitButton pending={pending}>{pending ? t("updatingPassword") : t("changePassword")}</SubmitButton>
    </form>
  );
}