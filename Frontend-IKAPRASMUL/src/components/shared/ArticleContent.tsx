import { cn } from "@/lib/utils";

/**
 * Renders article/story/business body HTML.
 *
 * SECURITY (security-standard §4.3): backend-authored HTML MUST be sanitized
 * before rendering. In this static phase the body strings are trusted literals
 * authored in `src/data/*` (no user input, no XSS vector). When the .NET CMS is
 * wired, sanitize on save AND here on render (e.g. DOMPurify / a constrained
 * MDX renderer) before passing to `dangerouslySetInnerHTML`.
 */
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
        "max-w-none space-y-4 text-base leading-7 text-foreground/85 [&_a]:text-primary [&_a]:underline [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
