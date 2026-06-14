import {
  BookOpenIcon,
  BulbIcon,
  GraduationCapIcon,
  LineChartIcon,
  NewspaperIcon,
  UsersIcon,
} from "@/components/icons";

type IconType = React.ComponentType<{ className?: string }>;

// Icon for each news category tab. "All" is the leading tab.
export const NEWS_CATEGORY_ICONS: Record<string, IconType> = {
  All: NewspaperIcon,
  "Campus News": GraduationCapIcon,
  "Alumni News": UsersIcon,
  "Research & Publications": BookOpenIcon,
  "Industry Trends": LineChartIcon,
  "Thought Leadership": BulbIcon,
};

// Gold text for the small category eyebrow on cards.
export const CATEGORY_EYEBROW =
  "text-[11px] font-bold uppercase tracking-wider text-gold";
