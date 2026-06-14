import {
  BriefcaseIcon,
  CameraIcon,
  ChevronsRightIcon,
  CloudRainIcon,
  CodepenIcon,
  CutleryIcon,
  CyclingIcon,
  DatabaseIcon,
  Edit3Icon,
  EditIcon,
  FarmIcon,
  FinanceIcon,
  GolfIcon,
  HeadphonesIcon,
  HealthIcon,
  LayersIcon,
  LeaderIcon,
  Link2Icon,
  MiningIcon,
  PieChartIcon,
  PlaneIcon,
  RefreshCcwIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  SmartphoneIcon,
  StarIcon,
  TrendingUpIcon,
  UsersIcon,
} from "@/components/icons";

type IconType = React.ComponentType<{ className?: string }>;

// Map from icon key (stored in data) → Figma icon component, chosen to match
// the SIG design.
const ICON_MAP: Record<string, IconType> = {
  "graduation-cap": GolfIcon, // PGPM (golf)
  "trending-up": TrendingUpIcon,
  palette: EditIcon, // Branding
  "message-circle": BriefcaseIcon, // Coaching
  "chef-hat": CutleryIcon, // Culinary
  bike: CyclingIcon, // Cycling
  monitor: CloudRainIcon, // Digital
  landmark: FinanceIcon, // Financial
  smartphone: SmartphoneIcon, // Fintech
  "gamepad-2": CodepenIcon, // Gamers
  "heart-pulse": HealthIcon, // Health
  "piggy-bank": PieChartIcon, // Investor
  crown: TrendingUpIcon, // Leadership
  factory: MiningIcon, // Mining & Energy
  music: HeadphonesIcon, // Music
  camera: CameraIcon, // Photographer
  store: ShoppingCartIcon, // Marketplace
  building: LayersIcon, // Property
  footprints: ChevronsRightIcon, // Runners
  plane: PlaneIcon, // Tourism
  "bar-chart-3": RefreshCcwIcon, // Traders
  handshake: ShoppingBagIcon, // UMKM & Koperasi
  sprout: FarmIcon, // Urban Farming
  "pen-tool": Edit3Icon, // Writers
  truck: Link2Icon, // Supply Chain
  briefcase: LeaderIcon, // CEO
  rocket: BriefcaseIcon, // Entrepreneur
  megaphone: StarIcon, // Marketing
  "volume-2": DatabaseIcon, // Buzzer
};

// Renders the SIG icon for a given data key (falls back to a group icon).
export function SigIcon({
  iconKey,
  className,
}: {
  iconKey?: string;
  className?: string;
}) {
  const Icon = (iconKey && ICON_MAP[iconKey]) || UsersIcon;
  return <Icon className={className} />;
}
