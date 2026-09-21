import { getTranslations } from "next-intl/server";
import { EditProfileForm } from "./EditProfileForm";
import type { CustomerProfile } from "../../../types/profile.types";

export async function EditProfile({ profile }: { profile: CustomerProfile }) {
  const t = await getTranslations("profile");

  return (
    <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-sm font-semibold tracking-wide text-foreground">
        {t("editSection")}
      </h2>
      <EditProfileForm profile={profile} />
    </section>
  );
}