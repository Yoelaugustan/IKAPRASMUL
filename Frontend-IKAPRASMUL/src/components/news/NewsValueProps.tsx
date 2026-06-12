import { BookOpen, Compass, HeartHandshake, Sparkles } from "lucide-react";

const PROPS = [
  { title: "Knowledge", description: "Research and ideas from faculty and alumni.", Icon: BookOpen },
  { title: "Relevance", description: "What matters now across industries.", Icon: Compass },
  { title: "Impact", description: "Stories of alumni making a difference.", Icon: Sparkles },
  { title: "Community", description: "News that keeps the network close.", Icon: HeartHandshake },
];

export function NewsValueProps() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {PROPS.map(({ title, description, Icon }) => (
        <div key={title} className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/5 text-primary">
            <Icon className="size-5" />
          </span>
          <div>
            <h3 className="font-semibold text-primary">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
