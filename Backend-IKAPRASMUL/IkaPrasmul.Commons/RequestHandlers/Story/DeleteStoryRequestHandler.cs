using System.Text.RegularExpressions;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.Story;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Story;

public class DeleteStoryRequestHandler : IRequestHandler<DeleteStoryRequest, Unit>
{
    private readonly ApplicationDbContext _db;
    private readonly IFileStorageService _files;

    public DeleteStoryRequestHandler(ApplicationDbContext db, IFileStorageService files)
    {
        _db = db;
        _files = files;
    }

    public async Task<Unit> Handle(DeleteStoryRequest request, CancellationToken ct)
    {
        var entity = await _db.Stories.FirstOrDefaultAsync(s => s.Slug == request.Slug, ct);
        if (entity is not null)
        {
            var coverImage = entity.CoverImage;
            var bodyImageUrls = ExtractLocalImageUrls(entity.Body);

            _db.Stories.Remove(entity);
            await _db.SaveChangesAsync(ct);

            await _files.DeleteAsync(coverImage, ct);
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
