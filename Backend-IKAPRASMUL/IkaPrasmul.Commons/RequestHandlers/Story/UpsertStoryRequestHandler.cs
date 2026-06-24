using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.Story;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using StoryEntity = IkaPrasmul.Entities.Models.Story;

namespace IkaPrasmul.Commons.RequestHandlers.Story;

public class UpsertStoryRequestHandler : IRequestHandler<UpsertStoryRequest, JsonElement>
{
    private readonly ApplicationDbContext _db;

    public UpsertStoryRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<JsonElement> Handle(UpsertStoryRequest request, CancellationToken ct)
    {
        var lookup = !string.IsNullOrWhiteSpace(request.OriginalSlug)
            ? request.OriginalSlug!
            : request.Slug;

        var entity = await _db.Stories.FirstOrDefaultAsync(s => s.Slug == lookup, ct);
        var now = DateTime.UtcNow;

        if (entity is null)
        {
            entity = new StoryEntity
            {
                Id = Guid.NewGuid(),
                CreatedAt = now,
                CreatedBy = request.Actor,
                SortOrder = await NextSortOrderAsync(ct),
            };
            _db.Stories.Add(entity);
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
        entity.Excerpt = request.Excerpt;
        entity.Body = ContentSanitizer.Sanitize(request.Body);
        entity.Category = request.Category;
        entity.AuthorName = request.Author?.Name;
        entity.AuthorClass = request.Author?.Class;
        entity.AuthorRole = request.Author?.Role;
        entity.CoverImage = request.CoverImage;
        entity.PublishedAt = request.PublishedAt;
        entity.ReadMinutes = request.ReadMinutes;
        entity.IsFeatured = request.IsFeatured;
        entity.IsFeaturedHome = request.IsFeaturedHome;
        entity.Status = request.IsDraft ? ContentStatus.Draft : ContentStatus.Published;

        await _db.SaveChangesAsync(ct);
        return ContentJson.Story(entity);
    }

    private async Task<int> NextSortOrderAsync(CancellationToken ct) =>
        (await _db.Stories.MaxAsync(s => (int?)s.SortOrder, ct) ?? -1) + 1;

    private async Task<string> EnsureUniqueSlugAsync(string desired, Guid currentId, CancellationToken ct)
    {
        var baseSlug = string.IsNullOrEmpty(desired) ? $"story-{currentId:N}"[..12] : desired;
        var slug = baseSlug;
        var n = 2;
        while (await _db.Stories.AnyAsync(s => s.Slug == slug && s.Id != currentId, ct))
        {
            slug = $"{baseSlug}-{n++}";
        }
        return slug;
    }
}
