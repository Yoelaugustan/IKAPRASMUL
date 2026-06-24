namespace IkaPrasmul.Commons.Services;

/// <summary>The outcome of a successful upload — the public URL the frontend stores.</summary>
public record StoredFile(string Url);

/// <summary>
/// Validates and persists admin uploads (images + newsletter PDFs). Implemented in
/// the Infrastructure layer. Enforces allow-list extension, magic-number signature,
/// size cap, UUID filename and EXIF stripping (security-standard §8).
/// </summary>
public interface IFileStorageService
{
    /// <param name="folder">Optional subfolder relative to wwwroot, e.g. "media/news".
    /// When provided the file is saved there instead of the default uploads directory.</param>
    Task<StoredFile> SaveAsync(
        byte[] content, string fileName, string contentType,
        string? folder = null,
        CancellationToken cancellationToken = default);

    /// <summary>Deletes the file at <paramref name="publicUrl"/> from local storage.
    /// No-ops silently for null/empty values or URLs outside the managed upload path
    /// (e.g. external https:// URLs that were pasted directly).</summary>
    Task DeleteAsync(string? publicUrl, CancellationToken cancellationToken = default);
}
