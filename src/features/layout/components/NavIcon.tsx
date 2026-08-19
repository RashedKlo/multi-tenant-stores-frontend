import type { NavItem } from "../types/layout.types";

interface NavIconProps {
  name: NavItem["icon"];
  className?: string;
  active?: boolean;
}

/**
 * Lightweight inline SVG icons – no external icon library required.
 */
export function NavIcon({ name, className = "h-5 w-5", active }: NavIconProps) {
  const stroke = active ? "currentColor" : "currentColor";
  const common = {
    className,
    fill: "none",
    stroke,
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9" />
        </svg>
      );
    case "cart":
      return (
        <svg {...common}>
          <path d="M6 6h15l-1.5 9h-12z" />
          <path d="M6 6 5 3H2" />
          <circle cx="9" cy="20" r="1.25" fill="currentColor" stroke="none" />
          <circle cx="17" cy="20" r="1.25" fill="currentColor" stroke="none" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
        </svg>
      );
    case "orders":
      return (
        <svg {...common}>
          <path d="M8 6h13" />
          <path d="M8 12h13" />
          <path d="M8 18h13" />
          <path d="M3 6h.01" />
          <path d="M3 12h.01" />
          <path d="M3 18h.01" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 19.5c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
        </svg>
      );
    default:
      return null;
  }
}
