using System.Text.RegularExpressions;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.Sig;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Sig;

public class DeleteSigSpotlightRequestHandler : IRequestHandler<DeleteSigSpotlightRequest, Unit>
{
    private readonly ApplicationDbContext _db;
    private readonly IFileStorageService _files;

    public DeleteSigSpotlightRequestHandler(ApplicationDbContext db, IFileStorageService files)
    {
        _db = db;
        _files = files;
    }

    public async Task<Unit> Handle(DeleteSigSpotlightRequest request, CancellationToken ct)
    {
        var entity = await _db.SigSpotlights.FirstOrDefaultAsync(s => s.Key == request.Key, ct);
        if (entity is not null)
        {
            var imageUrl = entity.ImageUrl;
            var descriptionImageUrls = ExtractLocalImageUrls(entity.Description);

            _db.SigSpotlights.Remove(entity);
            await _db.SaveChangesAsync(ct);

            await _files.DeleteAsync(imageUrl, ct);
            foreach (var url in descriptionImageUrls)
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
