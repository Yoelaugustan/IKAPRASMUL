using Ganss.Xss;

namespace IkaPrasmul.Commons.Services;

/// <summary>
/// Sanitizes admin-authored HTML (story/article/business/spotlight body fields)
/// against a strict allow-list before it is stored (security-standard §4.3).
/// The <see cref="HtmlSanitizer"/> is thread-safe for the Sanitize call.
/// </summary>
public static class ContentSanitizer
{
    private static readonly HtmlSanitizer Sanitizer = CreateSanitizer();

    public static string? Sanitize(string? html) =>
        string.IsNullOrWhiteSpace(html) ? html : Sanitizer.Sanitize(html);

    private static HtmlSanitizer CreateSanitizer()
    {
        var sanitizer = new HtmlSanitizer();
        // The rich-text editor only emits these tags.
        sanitizer.AllowedTags.Clear();
        foreach (var tag in new[]
                 {
                     "p", "br", "strong", "b", "em", "i", "u", "h3",
                     "blockquote", "ul", "ol", "li", "a", "img", "span",
                 })
        {
            sanitizer.AllowedTags.Add(tag);
        }

        sanitizer.AllowedAttributes.Clear();
        foreach (var attr in new[] { "href", "src", "alt", "title", "target", "rel" })
        {
            sanitizer.AllowedAttributes.Add(attr);
        }

        // Only safe URL schemes (no javascript:).
        sanitizer.AllowedSchemes.Clear();
        sanitizer.AllowedSchemes.Add("http");
        sanitizer.AllowedSchemes.Add("https");
        sanitizer.AllowedSchemes.Add("mailto");

        return sanitizer;
    }
}
