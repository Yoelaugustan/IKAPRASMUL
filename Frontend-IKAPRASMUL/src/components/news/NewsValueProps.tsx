import {
  BookOpenIcon,
  TargetIcon,
  TrendingUpIcon,
  UsersIcon,
} from "@/components/icons";

type IconType = React.ComponentType<{ className?: string }>;
const PROPS: { title: string; description: string; Icon: IconType }[] = [
  {
    title: "Knowledge",
    description: "Curated insights from experts and practitioners",
    Icon: BookOpenIcon,
  },
  {
    title: "Relevance",
    description: "Timely topics that matter to you",
    Icon: TargetIcon,
  },
  {
    title: "Impact",
    description: "Ideas that inspire action and create value",
    Icon: TrendingUpIcon,
  },
  {
    title: "Community",
    description: "Voices from our global alumni network",
    Icon: UsersIcon,
  },
];

export function NewsValueProps() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {PROPS.map(({ title, description, Icon }) => (
        <div key={title} className="flex items-start gap-3.5">
          <Icon className="mt-0.5 size-6 shrink-0 text-primary" />
          <div>
            <h3 className="text-[15px] font-bold text-slate-900">{title}</h3>
            <p className="mt-1 text-[13px] leading-6 text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
