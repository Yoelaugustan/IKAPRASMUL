namespace IkaPrasmul.Commons.Options;

/// <summary>Public base URLs used to build absolute links inside outgoing emails.</summary>
public class AppUrlsOptions
{
    public const string SectionName = "AppUrls";

    /// <summary>Public site origin, e.g. "https://ikaprasmul.id". Also prefixes relative
    /// upload paths (PDF/cover URLs) since the frontend proxies /media/* to the API —
    /// the API itself has no public port.</summary>
    public string Frontend { get; set; } = string.Empty;
}
