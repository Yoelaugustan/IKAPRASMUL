import {
  BellRing,
  Briefcase,
  Cpu,
  Factory,
  GraduationCap,
  HeartPulse,
  LayoutGrid,
  MoreHorizontal,
  Palette,
  Rocket,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Icon used in the "Browse by Industry" tabs. "All" is the leading tab.
export const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  All: LayoutGrid,
  Retail: Store,
  Startup: Rocket,
  "F&B": UtensilsCrossed,
  Consulting: Briefcase,
  Manufacturing: Factory,
  Services: BellRing,
  Creative: Palette,
  Technology: Cpu,
  Healthcare: HeartPulse,
  Education: GraduationCap,
  Other: MoreHorizontal,
};

// Colored pill styles for the industry tag on each business card.
export const INDUSTRY_BADGE: Record<string, string> = {
  Retail: "bg-rose-100 text-rose-700",
  Startup: "bg-violet-100 text-violet-700",
  "F&B": "bg-amber-100 text-amber-800",
  Consulting: "bg-blue-100 text-blue-700",
  Manufacturing: "bg-orange-100 text-orange-800",
  Services: "bg-teal-100 text-teal-700",
  Creative: "bg-pink-100 text-pink-700",
  Technology: "bg-indigo-100 text-indigo-700",
  Healthcare: "bg-emerald-100 text-emerald-700",
  Education: "bg-sky-100 text-sky-700",
  Other: "bg-slate-100 text-slate-700",
};

export const industryBadgeClass = (industry: string) =>
  INDUSTRY_BADGE[industry] ?? "bg-slate-100 text-slate-700";
