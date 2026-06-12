import { Construction } from "lucide-react";

// Stub for CMS sections that aren't built yet (static phase). Keeps admin nav
// functional without 404s and signals what's coming.
export function AdminPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-primary">{title}</h1>
      <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed bg-background px-6 py-20 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-primary/5 text-primary">
          <Construction className="size-6" />
        </span>
        <h2 className="mt-4 text-lg font-semibold text-primary">Coming soon</h2>
        <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
        <p className="mt-4 max-w-md text-xs text-muted-foreground">
          This CMS module will be wired to the .NET backend in a later phase.
        </p>
      </div>
    </div>
  );
}
