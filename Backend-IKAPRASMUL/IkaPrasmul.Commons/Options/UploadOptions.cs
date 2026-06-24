namespace IkaPrasmul.Commons.Options;

/// <summary>Where admin uploads are written and how they are served.</summary>
public class UploadOptions
{
    public const string SectionName = "Upload";

    /// <summary>Absolute filesystem path of the wwwroot directory
    /// (set in Program from the web host environment).</summary>
    public string WebRootPath { get; set; } = string.Empty;

    /// <summary>Absolute filesystem directory uploads are written to
    /// (set in Program from the web root, e.g. wwwroot/media/uploads).</summary>
    public string RootPath { get; set; } = string.Empty;

    /// <summary>Public URL prefix the stored file is served under.</summary>
    public string PublicBasePath { get; set; } = "/media/uploads";

    public long MaxBytes { get; set; } = 5 * 1024 * 1024;
}
