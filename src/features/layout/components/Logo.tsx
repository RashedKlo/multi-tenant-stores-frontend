import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";

interface LogoProps {
  label?: string;
  className?: string;
  /** Renders just the mark, useful for very tight spaces. */
  iconOnly?: boolean;
}

export function Logo({
  label = "marketplace",
  className,
  iconOnly = false,
}: LogoProps) {
  return (
    <Link
      href="/home"
      className={cn(
        "group flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90",
        className
      )}
    >
      {/* Favicon mark */}
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/10 shadow-sm shadow-primary/20 ring-1 ring-inset ring-primary/15 transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
        <Image
          src="/favicon.ico"
          alt=""
          width={28}
          height={28}
          className="object-contain"
          priority
        />
      </span>

      {!iconOnly && (
        <span className="text-base font-semibold tracking-tight text-foreground">
          {label}
        </span>
      )}
    </Link>
  );
}