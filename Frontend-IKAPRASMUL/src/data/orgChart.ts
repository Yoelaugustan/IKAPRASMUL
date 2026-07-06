import {
  Briefcase,
  Code2,
  GraduationCap,
  Megaphone,
  Sprout,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

// Departments reporting into the executive board, left to right as drawn in
// the org chart. `labelKey` looks up the translated title in
// t.about.orgChart.departments.
export const ORG_CHART_DEPARTMENTS: { labelKey: string; icon: LucideIcon }[] = [
  { labelKey: "membership", icon: Users },
  { labelKey: "entrepreneurship", icon: Briefcase },
  { labelKey: "career", icon: TrendingUp },
  { labelKey: "education", icon: GraduationCap },
  { labelKey: "communication", icon: Megaphone },
  { labelKey: "technology", icon: Code2 },
  { labelKey: "social", icon: Sprout },
];
