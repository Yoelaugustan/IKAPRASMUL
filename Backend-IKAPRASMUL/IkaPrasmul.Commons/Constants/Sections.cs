namespace IkaPrasmul.Commons.Constants;

/// <summary>Section identifiers used in JWT <c>perms</c> claims and the
/// <see cref="IkaPrasmul.WebAPI.Filters.RequiresSectionAttribute"/> guard.</summary>
public static class Sections
{
    public const string Sig = "sig";
    public const string Business = "business";
    public const string Stories = "stories";
    public const string News = "news";
    public const string Events = "events";

    public static readonly IReadOnlyList<string> All =
        [Sig, Business, Stories, News, Events];
}
