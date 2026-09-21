"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FormField, SubmitButton, AlertBanner } from "@/shared/lib/ui/FormField";
import { updateProfileAction } from "../../../actions/update-profile-action";
import type { CustomerProfile } from "../../../types/profile.types";

interface EditProfileFormProps {
  profile: CustomerProfile;
}

export function EditProfileForm({ profile }: EditProfileFormProps) {
  const t = useTranslations("profile");
  const tAuth = useTranslations("auth");
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      const result = await updateProfileAction({ firstName, lastName });
      if (!result.success) {
        setError(tAuth(result.error as Parameters<typeof tAuth>[0]));
        return;
      }
      setSuccess(true);
      router.refresh();
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {error && <AlertBanner message={error} />}
      {success && <AlertBanner message={t("profileUpdated")} variant="success" />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField name="firstName" autoComplete="given-name" label={tAuth("firstName")} value={firstName} onChange={(event) => setFirstName(event.target.value)} required disabled={pending} />
        <FormField name="lastName" autoComplete="family-name" label={tAuth("lastName")} value={lastName} onChange={(event) => setLastName(event.target.value)} required disabled={pending} />
      </div>
      <FormField name="email" type="email" label={tAuth("email")} value={profile.email} disabled readOnly hint={t("emailReadOnlyHint")} />
      <SubmitButton pending={pending}>{pending ? t("saving") : t("saveChanges")}</SubmitButton>
    </form>
  );
}