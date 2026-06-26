import { cn } from "@/lib/utils";

export function ArticleContent({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-none space-y-4 text-base leading-7 text-foreground/85",
        "[&_a]:text-primary [&_a]:underline",
        "[&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary",
        "[&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-primary",
        "[&_blockquote]:border-l-4 [&_blockquote]:border-gold [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-foreground/70 [&_blockquote]:my-2",
        "[&_.auto-img-grid]:grid [&_.auto-img-grid]:grid-cols-2 [&_.auto-img-grid]:gap-2",
        "[&_.auto-img-grid_img]:!m-0 [&_.auto-img-grid_img]:h-auto [&_.auto-img-grid_img]:w-full [&_.auto-img-grid_img]:rounded-lg",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
