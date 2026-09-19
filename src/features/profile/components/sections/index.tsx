// src/features/profile/components/sections/Profile/index.tsx
// Server Component — no "use client"
import { getProfile } from "../../api/get-profile";
import { ProfileAuthGate } from "../ProfileAuthGate";
import { ProfileShell } from "../ProfileShell";
import { ProfileSkeleton } from "./skeleton";

export async function Profile() {
  const profile = await getProfile();

  if (!profile) {
    return <ProfileAuthGate />;
  }

  return <ProfileShell profile={profile} />;
}

Profile.Skeleton = ProfileSkeleton;