import { cn } from "@/lib/utils";

export function ArticleContent({
  html,
  className,
  autoGrid = false,
}: {
  html: string;
  className?: string;
  /** When true, enables auto-enhancements for stories/business content:
   *  1. Consecutive <img> tags → 2-column grid
   *  2. <p> starting with " (U+201C curly) or " (U+0022 straight) → <blockquote>
   *  Not used for news articles which already have manual wrappers. */
  autoGrid?: boolean;
}) {
  const processed = autoGrid
    ? processQuoteBlocks(groupConsecutiveImages(html))
    : html;

  return (
    <div
      className={cn(
        "max-w-none space-y-4 text-base leading-7 text-foreground/85",
        "[&_a]:text-primary [&_a]:underline",
        "[&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary",
        "[&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-primary",
        "[&_blockquote]:border-l-4 [&_blockquote]:border-gold [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-foreground/70 [&_blockquote]:my-2",
        "[&_.auto-img-grid]:grid [&_.auto-img-grid]:grid-cols-2 [&_.auto-img-grid]:gap-2",
        "[&_.auto-img-grid_img]:!m-0 [&_.auto-img-grid_img]:w-full [&_.auto-img-grid_img]:rounded-lg [&_.auto-img-grid_img]:object-cover",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  );
}

function groupConsecutiveImages(html: string): string {
  return html.replace(
    /((?:<img\b[^>]*>[ \t\r\n]*){2,})/g,
    (match) => `<div class="auto-img-grid">${match}</div>`,
  );
}

// “ = left curly double quote; " = straight double quote
function processQuoteBlocks(html: string): string {
  return html.replace(
    new RegExp("<p>([\u201c\u0022][^<]*)<\/p>", "g"),
    "<blockquote><p>$1</p></blockquote>",
  );
}
