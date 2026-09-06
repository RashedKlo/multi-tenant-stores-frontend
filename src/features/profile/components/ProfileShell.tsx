// src/features/profile/components/ProfileShell.tsx
import { getTranslations } from "next-intl/server";
import { ProfileHeader } from "./sections/ProfileHeader";
import { EditProfileForm } from "./sections/EditProfileForm";
import { ChangePasswordForm } from "./sections/ChangePasswordForm";
import { LogoutButton } from "./sections/LogoutButton";
import type { CustomerProfile } from "../types/profile.types";

interface ProfileShellProps {
  profile: CustomerProfile;
}

export async function ProfileShell({ profile }: ProfileShellProps) {
  const t = await getTranslations("profile");

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6 md:py-10">
      <ProfileHeader
        profile={profile}
        title={t("title")}
        verifiedLabel={t("emailVerified")}
        unverifiedLabel={t("emailUnverified")}
        memberSinceLabel={t("memberSince")}
      />

      <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-sm font-semibold tracking-wide text-foreground">
          {t("editSection")}
        </h2>
        <EditProfileForm profile={profile} />
      </section>

      <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
        <h2 className="mb-1 text-sm font-semibold tracking-wide text-foreground">
          {t("securitySection")}
        </h2>
        <p className="mb-4 text-xs text-muted-foreground">
          {t("securityHint")}
        </p>
        <ChangePasswordForm />
      </section>

      <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-sm font-semibold tracking-wide text-foreground">
          {t("sessionSection")}
        </h2>
        <LogoutButton />
      </section>
    </div>
  );
}