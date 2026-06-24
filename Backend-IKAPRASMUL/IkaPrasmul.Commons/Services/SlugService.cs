using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace IkaPrasmul.Commons.Services;

/// <summary>Normalizes admin-supplied slugs/keys to a lowercase, URL-safe form.
/// Uniqueness is enforced per-table inside each upsert handler.</summary>
public static partial class SlugService
{
    [GeneratedRegex("[^a-z0-9]+")]
    private static partial Regex NonSlugChars();

    public static string Slugify(string value)
    {
        if (string.IsNullOrWhiteSpace(value)) return string.Empty;

        // Strip diacritics, then collapse everything non-alphanumeric to single dashes.
        var normalized = value.Trim().ToLowerInvariant().Normalize(NormalizationForm.FormD);
        var sb = new StringBuilder(normalized.Length);
        foreach (var ch in normalized)
        {
            if (CharUnicodeInfo.GetUnicodeCategory(ch) != UnicodeCategory.NonSpacingMark)
            {
                sb.Append(ch);
            }
        }

        var slug = NonSlugChars().Replace(sb.ToString().Normalize(NormalizationForm.FormC), "-");
        return slug.Trim('-');
    }
}
