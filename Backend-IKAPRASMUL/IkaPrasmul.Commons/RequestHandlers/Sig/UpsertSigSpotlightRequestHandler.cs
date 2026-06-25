using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Exceptions;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.Sig;
using IkaPrasmul.Entities;
using IkaPrasmul.Entities.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Sig;

public class UpsertSigSpotlightRequestHandler : IRequestHandler<UpsertSigSpotlightRequest, JsonElement>
{
    private readonly ApplicationDbContext _db;

    public UpsertSigSpotlightRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<JsonElement> Handle(UpsertSigSpotlightRequest request, CancellationToken ct)
    {
        var lookup = !string.IsNullOrWhiteSpace(request.OriginalId) ? request.OriginalId! : request.Id;
        var entity = await _db.SigSpotlights.FirstOrDefaultAsync(s => s.Key == lookup, ct);
        var now = DateTime.UtcNow;

        if (entity is null)
        {
            entity = new SigSpotlight
            {
                Id = Guid.NewGuid(),
                CreatedAt = now,
                CreatedBy = request.Actor,
                SortOrder = (await _db.SigSpotlights.MaxAsync(s => (int?)s.SortOrder, ct) ?? -1) + 1,
            };
            _db.SigSpotlights.Add(entity);
        }
        else
        {
            entity.UpdatedAt = now;
            entity.UpdatedBy = request.Actor;
        }

        var desiredKey = SlugService.Slugify(
            !string.IsNullOrWhiteSpace(request.Id) ? request.Id : request.Name);
        entity.Key = await EnsureUniqueKeyAsync(desiredKey, entity.Id, ct);

        if (request.IsSpotlight)
        {
            var spotlightCount = await _db.SigSpotlights.CountAsync(s => s.IsSpotlight && s.Id != entity.Id, ct);
            if (spotlightCount >= 2)
                throw new BusinessRuleException("Only 2 spotlights can be active at a time. Remove one before adding another.");
        }

        entity.Name = request.Name.Trim();
        entity.ImageUrl = request.Image;
        entity.Description = ContentSanitizer.Sanitize(request.Description);
        entity.IsSpotlight = request.IsSpotlight;
        entity.Status = request.IsDraft ? ContentStatus.Draft : ContentStatus.Published;

        await _db.SaveChangesAsync(ct);
        return ContentJson.SigSpotlight(entity);
    }

    private async Task<string> EnsureUniqueKeyAsync(string desired, Guid currentId, CancellationToken ct)
    {
        var baseKey = string.IsNullOrEmpty(desired) ? $"spotlight-{currentId:N}"[..16] : desired;
        var key = baseKey;
        var n = 2;
        while (await _db.SigSpotlights.AnyAsync(s => s.Key == key && s.Id != currentId, ct))
        {
            key = $"{baseKey}-{n++}";
        }
        return key;
    }
}
