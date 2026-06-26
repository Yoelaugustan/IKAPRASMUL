using System.Text.RegularExpressions;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.Business;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Business;

public class DeleteBusinessRequestHandler : IRequestHandler<DeleteBusinessRequest, Unit>
{
    private readonly ApplicationDbContext _db;
    private readonly IFileStorageService _files;

    public DeleteBusinessRequestHandler(ApplicationDbContext db, IFileStorageService files)
    {
        _db = db;
        _files = files;
    }

    public async Task<Unit> Handle(DeleteBusinessRequest request, CancellationToken ct)
    {
        var entity = await _db.BusinessListings.FirstOrDefaultAsync(b => b.Slug == request.Slug, ct);
        if (entity is not null)
        {
            var logo = entity.Logo;
            var coverImage = entity.CoverImage;
            var bodyImageUrls = ExtractLocalImageUrls(entity.Description);

            _db.BusinessListings.Remove(entity);
            await _db.SaveChangesAsync(ct);

            await _files.DeleteAsync(logo, ct);
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
