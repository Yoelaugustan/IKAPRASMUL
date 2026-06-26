using IkaPrasmul.Commons.Services;
using Microsoft.AspNetCore.Mvc;

namespace IkaPrasmul.WebAPI.Controllers;

/// <summary>Admin image / newsletter-PDF upload (security-standard §8). Admin only.</summary>
[Route("api/admin/upload")]
public class AdminUploadController : AdminControllerBase
{
    private static readonly HashSet<string> AllowedFolders = new(StringComparer.OrdinalIgnoreCase)
    {
        "media/news",
        "media/news/newsletters",
        "media/stories",
        "media/business",
        "media/sig",
        "media/events",
    };

    private readonly IFileStorageService _storage;

    public AdminUploadController(IFileStorageService storage) => _storage = storage;

    [HttpPost]
    [RequestSizeLimit(6 * 1024 * 1024)] // backstop above the 5 MB content cap
    public async Task<IActionResult> Upload(
        IFormFile? file,
        [FromForm] string? folder,
        CancellationToken ct)
    {
        if (file is null || file.Length == 0)
            return BadRequest(new { error = "No file was uploaded." });

        if (!string.IsNullOrWhiteSpace(folder) && !AllowedFolders.Contains(folder))
            return BadRequest(new { error = "Invalid upload folder." });

        using var ms = new MemoryStream();
        await file.CopyToAsync(ms, ct);

        // Validation failures surface as 400 via the global exception handler.
        var stored = await _storage.SaveAsync(ms.ToArray(), file.FileName, file.ContentType, folder, ct);
        return Ok(stored);
    }
}
