import type { CustomerProfile } from "../../../types/profile.types";

interface ProfileHeaderProps {
  profile: CustomerProfile;
  title: string;
  verifiedLabel: string;
  unverifiedLabel: string;
  memberSinceLabel: string;
}

export function ProfileHeader({
  profile,
  title,
  verifiedLabel,
  unverifiedLabel,
  memberSinceLabel,
}: ProfileHeaderProps) {
  const initials = `${profile.firstName[0] ?? ""}${profile.lastName[0] ?? ""}`.toUpperCase();
  const fullName = `${profile.firstName} ${profile.lastName}`.trim();
  const memberSince = new Date(profile.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-lg font-semibold text-primary">
          {initials || "?"}
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="truncate text-sm text-muted-foreground">{fullName}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {profile.email}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:flex-col">
        <span className="text-xs text-muted-foreground">
          {memberSinceLabel}: {memberSince}
        </span>
        <span
          className={[
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
            profile.isEmailVerified
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground",
          ].join(" ")}
        >
          {profile.isEmailVerified ? verifiedLabel : unverifiedLabel}
        </span>
      </div>
    </div>
  );
}