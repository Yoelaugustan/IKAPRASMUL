using System.Text.RegularExpressions;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.Event;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Event;

public class DeleteEventRequestHandler : IRequestHandler<DeleteEventRequest, Unit>
{
    private readonly ApplicationDbContext _db;
    private readonly IFileStorageService _files;

    public DeleteEventRequestHandler(ApplicationDbContext db, IFileStorageService files)
    {
        _db = db;
        _files = files;
    }

    public async Task<Unit> Handle(DeleteEventRequest request, CancellationToken ct)
    {
        var entity = await _db.Events.FirstOrDefaultAsync(e => e.Slug == request.Slug, ct);
        if (entity is not null)
        {
            var coverImage = entity.CoverImage;
            var bodyImageUrls = ExtractLocalImageUrls(entity.Description);

            _db.Events.Remove(entity);
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
