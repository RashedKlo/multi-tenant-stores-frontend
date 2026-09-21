// Server Component — no "use client"
import { getTranslations } from "next-intl/server";
import { getProfile } from "../../../api/get-profile";
import { ProfileAuthGate } from "../../ProfileAuthGate";
import { ProfileShell } from "../../ProfileShell";
import { ChangePassword } from "../ChangePassword";
import { EditProfile } from "../EditProfile";
import { ProfileHeader } from "../ProfileHeader";
import { Session } from "../Session";
import { ProfileSkeleton } from "./skeleton";

export async function Profile() {
  const result = await getProfile();

  if (!result.success) {
    return <ProfileAuthGate />;
  }

  const t = await getTranslations("profile");

  return (
    <ProfileShell>
      <ProfileHeader
        profile={result.data}
        title={t("title")}
        verifiedLabel={t("emailVerified")}
        unverifiedLabel={t("emailUnverified")}
        memberSinceLabel={t("memberSince")}
      />
      <EditProfile profile={result.data} />
      <ChangePassword />
      <Session />
    </ProfileShell>
  );
}

Profile.Skeleton = ProfileSkeleton;

export { ProfileSkeleton };