using System.Text.RegularExpressions;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.News;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.News;

public class DeleteNewsRequestHandler : IRequestHandler<DeleteNewsRequest, Unit>
{
    private readonly ApplicationDbContext _db;
    private readonly IFileStorageService _files;

    public DeleteNewsRequestHandler(ApplicationDbContext db, IFileStorageService files)
    {
        _db = db;
        _files = files;
    }

    public async Task<Unit> Handle(DeleteNewsRequest request, CancellationToken ct)
    {
        var entity = await _db.News.FirstOrDefaultAsync(a => a.Slug == request.Slug, ct);
        if (entity is not null)
        {
            var coverImage = entity.CoverImage;
            var pdfUrl = entity.PdfUrl;
            var bodyImageUrls = ExtractLocalImageUrls(entity.Body);

            _db.News.Remove(entity);
            await _db.SaveChangesAsync(ct);

            await _files.DeleteAsync(coverImage, ct);
            await _files.DeleteAsync(pdfUrl, ct);
            foreach (var url in bodyImageUrls)
                await _files.DeleteAsync(url, ct);
        }
        return Unit.Value;
    }

    private static IEnumerable<string> ExtractLocalImageUrls(string? html)
    {
        if (string.IsNullOrWhiteSpace(html)) yield break;
        foreach (Match m in Regex.Matches(html, @"src=""(/media/[^""]+)""", RegexOptions.IgnoreCase))
            yield return m.Groups[1].Value;
    }
}
