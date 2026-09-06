import { getTranslations } from "next-intl/server";
import { getProfile, ProfileShell, ProfileAuthGate } from "@/features/profile";

export async function generateMetadata() {
  const t = await getTranslations("profile");
  return { title: t("title") };
}

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile) {
    return <ProfileAuthGate />;
  }

  return <ProfileShell profile={profile} />;
}