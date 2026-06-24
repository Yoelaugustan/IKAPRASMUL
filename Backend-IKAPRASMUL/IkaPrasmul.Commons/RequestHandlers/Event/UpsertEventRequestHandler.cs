using System.Text.Json;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.Event;
using IkaPrasmul.Entities;
using EventEntity = IkaPrasmul.Entities.Models.Event;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Event;

public class UpsertEventRequestHandler : IRequestHandler<UpsertEventRequest, JsonElement>
{
    private readonly ApplicationDbContext _db;

    public UpsertEventRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<JsonElement> Handle(UpsertEventRequest request, CancellationToken ct)
    {
        var lookup = !string.IsNullOrWhiteSpace(request.OriginalSlug)
            ? request.OriginalSlug!
            : request.Slug;

        var entity = await _db.Events.FirstOrDefaultAsync(e => e.Slug == lookup, ct);
        var now = DateTime.UtcNow;

        if (entity is null)
        {
            entity = new EventEntity
            {
                Id = Guid.NewGuid(),
                CreatedAt = now,
                CreatedBy = request.Actor,
                SortOrder = (await _db.Events.MaxAsync(e => (int?)e.SortOrder, ct) ?? -1) + 1,
            };
            _db.Events.Add(entity);
        }
        else
        {
            entity.UpdatedAt = now;
            entity.UpdatedBy = request.Actor;
        }

        var desiredSlug = SlugService.Slugify(
            !string.IsNullOrWhiteSpace(request.Slug) ? request.Slug : request.Title);
        entity.Slug = await EnsureUniqueSlugAsync(desiredSlug, entity.Id, ct);

        entity.Title = request.Title.Trim();
        entity.Date = request.Date;
        entity.Location = request.Location;
        entity.CoverImage = request.CoverImage;
        entity.Description = request.Description;
        entity.RegisterUrl = request.RegisterUrl;

        await _db.SaveChangesAsync(ct);
        return ContentJson.Event(entity);
    }

    private async Task<string> EnsureUniqueSlugAsync(string desired, Guid currentId, CancellationToken ct)
    {
        var baseSlug = string.IsNullOrEmpty(desired) ? $"event-{currentId:N}"[..12] : desired;
        var slug = baseSlug;
        var n = 2;
        while (await _db.Events.AnyAsync(e => e.Slug == slug && e.Id != currentId, ct))
        {
            slug = $"{baseSlug}-{n++}";
        }
        return slug;
    }
}
