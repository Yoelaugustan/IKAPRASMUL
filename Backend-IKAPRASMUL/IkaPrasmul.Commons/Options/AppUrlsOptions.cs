namespace IkaPrasmul.Commons.Options;

/// <summary>Public base URLs used to build absolute links inside outgoing emails.</summary>
public class AppUrlsOptions
{
    public const string SectionName = "AppUrls";

    /// <summary>Public site origin, e.g. "https://ikaprasmul.id".</summary>
    public string Frontend { get; set; } = string.Empty;

    /// <summary>API origin — prefixes relative upload paths (e.g. PDF/cover URLs).</summary>
    public string Api { get; set; } = string.Empty;
}
