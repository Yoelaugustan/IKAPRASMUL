using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Exceptions;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.Business;
using IkaPrasmul.Entities;
using IkaPrasmul.Entities.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Business;

public class UpsertBusinessRequestHandler : IRequestHandler<UpsertBusinessRequest, JsonElement>
{
    private readonly ApplicationDbContext _db;
    private readonly IFileStorageService _files;

    public UpsertBusinessRequestHandler(ApplicationDbContext db, IFileStorageService files)
    {
        _db = db;
        _files = files;
    }

    public async Task<JsonElement> Handle(UpsertBusinessRequest request, CancellationToken ct)
    {
        var lookup = !string.IsNullOrWhiteSpace(request.OriginalSlug)
            ? request.OriginalSlug!
            : request.Slug;

        var entity = await _db.BusinessListings.FirstOrDefaultAsync(b => b.Slug == lookup, ct);
        bool isUpdate = entity is not null;

        // Snapshot old local file URLs before overwriting (update path only).
        var oldLogo = entity?.Logo;
        var oldCover = entity?.CoverImage;
        var oldBodyUrls = ContentSanitizer.ExtractLocalImageUrls(entity?.Description).ToHashSet();

        var now = DateTime.UtcNow;

        if (entity is null)
        {
            entity = new BusinessListing
            {
                Id = Guid.NewGuid(),
                CreatedAt = now,
                CreatedBy = request.Actor,
                SortOrder = (await _db.BusinessListings.MaxAsync(b => (int?)b.SortOrder, ct) ?? -1) + 1,
            };
            _db.BusinessListings.Add(entity);
        }
        else
        {
            entity.UpdatedAt = now;
            entity.UpdatedBy = request.Actor;
        }

        if (request.IsSpotlight)
        {
            var spotlightCount = await _db.BusinessListings.CountAsync(b => b.IsSpotlight && b.Id != entity.Id, ct);
            if (spotlightCount >= 1)
                throw new BusinessRuleException("Only 1 business can be spotlighted at a time. Remove the current spotlight before setting a new one.");
        }

        if (request.IsFeatured)
        {
            var featuredCount = await _db.BusinessListings.CountAsync(b => b.IsFeatured && b.Id != entity.Id, ct);
            if (featuredCount >= 8)
                throw new BusinessRuleException("Only 8 businesses can be featured at a time. Unfeature one before featuring another.");
        }

        var desiredSlug = SlugService.Slugify(
            !string.IsNullOrWhiteSpace(request.Slug) ? request.Slug : request.Name);
        entity.Slug = await EnsureUniqueSlugAsync(desiredSlug, entity.Id, ct);

        entity.Name = request.Name.Trim();
        entity.Industry = request.Industry;
        entity.FounderName = request.Founder?.Name;
        entity.FounderClass = request.Founder?.Class;
        entity.Location = request.Location;
        entity.ShortDescription = request.ShortDescription;
        entity.Description = ContentSanitizer.Sanitize(request.Description);
        entity.Logo = request.Logo;
        entity.CoverImage = request.CoverImage;
        entity.Website = request.Website;
        entity.IsSpotlight = request.IsSpotlight;
        entity.IsFeatured = request.IsFeatured;
        entity.IsFeaturedHome = request.IsFeaturedHome;
        entity.Status = request.IsDraft ? ContentStatus.Draft : ContentStatus.Published;

        await _db.SaveChangesAsync(ct);

        if (isUpdate)
        {
            if (oldLogo != entity.Logo) await _files.DeleteAsync(oldLogo, ct);
            if (oldCover != entity.CoverImage) await _files.DeleteAsync(oldCover, ct);
            var newBodyUrls = ContentSanitizer.ExtractLocalImageUrls(entity.Description).ToHashSet();
            foreach (var url in oldBodyUrls.Except(newBodyUrls))
                await _files.DeleteAsync(url, ct);
        }

        return ContentJson.Business(entity);
    }

    private async Task<string> EnsureUniqueSlugAsync(string desired, Guid currentId, CancellationToken ct)
    {
        var baseSlug = string.IsNullOrEmpty(desired) ? $"business-{currentId:N}"[..15] : desired;
        var slug = baseSlug;
        var n = 2;
        while (await _db.BusinessListings.AnyAsync(b => b.Slug == slug && b.Id != currentId, ct))
        {
            slug = $"{baseSlug}-{n++}";
        }
        return slug;
    }
}
