import type { ImpactStat } from "@/types";

// Home "Our Impact in Numbers" band. Admin-configurable in the real CMS.
// `key` also selects the icon in components/layouts/ImpactStats.tsx.
export const IMPACT_STATS: ImpactStat[] = [
  { key: "alumni", label: "Alumni", value: "18,000+" },
  { key: "sig", label: "SIG", value: "30+" },
  { key: "entrepreneurs", label: "Entrepreneurs", value: "2,000+" },
  { key: "events", label: "Events", value: "1000+" },
];
