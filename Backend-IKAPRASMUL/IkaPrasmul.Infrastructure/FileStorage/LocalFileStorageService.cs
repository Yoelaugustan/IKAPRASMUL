using FluentValidation;
using FluentValidation.Results;
using IkaPrasmul.Commons.Options;
using IkaPrasmul.Commons.Services;
using Microsoft.Extensions.Options;
using SixLabors.ImageSharp;

namespace IkaPrasmul.Infrastructure.FileStorage;

/// <summary>
/// Stores admin uploads on local disk under the web root (dev). Validates the
/// extension allow-list, the file signature (magic numbers — never trusting the
/// content-type), and the size cap; assigns a UUID filename; and strips EXIF from
/// images by re-encoding (security-standard §8).
/// </summary>
public class LocalFileStorageService : IFileStorageService
{
    private static readonly string[] ImageExtensions = { ".jpg", ".jpeg", ".png", ".webp" };
    private const string PdfExtension = ".pdf";

    private readonly UploadOptions _options;
    // Resolved once: WebRootPath from config, or derived from RootPath ({webroot}/media/uploads → go up 2).
    private readonly string _webRoot;

    public LocalFileStorageService(IOptions<UploadOptions> options)
    {
        _options = options.Value;
        _webRoot = !string.IsNullOrWhiteSpace(_options.WebRootPath)
            ? _options.WebRootPath
            : (Path.GetDirectoryName(Path.GetDirectoryName(_options.RootPath)) ?? _options.RootPath);
    }

    public async Task<StoredFile> SaveAsync(
        byte[] content, string fileName, string contentType,
        string? folder = null,
        CancellationToken cancellationToken = default)
    {
        if (content.Length == 0)
        {
            throw Fail("file", "The file is empty.");
        }

        if (content.Length > _options.MaxBytes)
        {
            throw Fail("file", $"The file exceeds the {_options.MaxBytes / (1024 * 1024)} MB limit.");
        }

        var ext = Path.GetExtension(fileName).ToLowerInvariant();
        var isImage = ImageExtensions.Contains(ext);
        var isPdf = ext == PdfExtension;

        if (!isImage && !isPdf)
        {
            throw Fail("file", "Only JPG, PNG, WEBP images and PDF files are allowed.");
        }

        if (!SignatureMatches(ext, content))
        {
            throw Fail("file", "The file content does not match its extension.");
        }

        // Determine where to save: a named subfolder under wwwroot, or the
        // default uploads directory when no folder is specified.
        string saveDir;
        string publicDir;
        if (!string.IsNullOrWhiteSpace(folder))
        {
            var folderNative = folder.Replace('/', Path.DirectorySeparatorChar).Trim(Path.DirectorySeparatorChar);
            saveDir = Path.Combine(_webRoot, folderNative);
            publicDir = "/" + folder.Trim('/');
        }
        else
        {
            saveDir = _options.RootPath;
            publicDir = _options.PublicBasePath.TrimEnd('/');
        }

        Directory.CreateDirectory(saveDir);
        var storedName = $"{Guid.NewGuid():N}{ext}";
        var fullPath = Path.Combine(saveDir, storedName);

        if (isImage)
        {
            // Re-encode through ImageSharp to drop all metadata (EXIF/GPS, etc.).
            using var image = Image.Load(content);
            image.Metadata.ExifProfile = null;
            image.Metadata.IptcProfile = null;
            image.Metadata.XmpProfile = null;
            await image.SaveAsync(fullPath, cancellationToken);
        }
        else
        {
            await File.WriteAllBytesAsync(fullPath, content, cancellationToken);
        }

        var url = $"{publicDir}/{storedName}";
        return new StoredFile(url);
    }

    public Task DeleteAsync(string? publicUrl, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(publicUrl)) return Task.CompletedTask;

        // Skip external URLs — we only manage local files.
        if (publicUrl.StartsWith("http://", StringComparison.OrdinalIgnoreCase) ||
            publicUrl.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
            return Task.CompletedTask;

        // Resolve the public URL path to a physical path.
        var relativePath = publicUrl.TrimStart('/').Replace('/', Path.DirectorySeparatorChar);
        var fullPath = Path.GetFullPath(Path.Combine(_webRoot, relativePath));

        // Guard: must remain inside the web root (prevents path traversal).
        if (!fullPath.StartsWith(_webRoot, StringComparison.OrdinalIgnoreCase))
            return Task.CompletedTask;

        if (File.Exists(fullPath))
            File.Delete(fullPath);

        return Task.CompletedTask;
    }

    private static ValidationException Fail(string property, string message) =>
        new(new[] { new ValidationFailure(property, message) });

    private static bool SignatureMatches(string ext, byte[] b) => ext switch
    {
        ".jpg" or ".jpeg" => b.Length >= 3 && b[0] == 0xFF && b[1] == 0xD8 && b[2] == 0xFF,
        ".png" => b.Length >= 4 && b[0] == 0x89 && b[1] == 0x50 && b[2] == 0x4E && b[3] == 0x47,
        ".webp" => b.Length >= 12
            && b[0] == 0x52 && b[1] == 0x49 && b[2] == 0x46 && b[3] == 0x46  // RIFF
            && b[8] == 0x57 && b[9] == 0x45 && b[10] == 0x42 && b[11] == 0x50, // WEBP
        ".pdf" => b.Length >= 4 && b[0] == 0x25 && b[1] == 0x50 && b[2] == 0x44 && b[3] == 0x46, // %PDF
        _ => false,
    };
}
