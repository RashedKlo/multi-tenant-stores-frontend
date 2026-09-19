// app/(main)/profile/page.tsx
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Profile } from "@/features/profile";
import { ProfileSkeleton } from "@/features/profile";

export async function generateMetadata() {
  const t = await getTranslations("profile");
  return { title: t("title") };
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <Profile />
    </Suspense>
  );
}