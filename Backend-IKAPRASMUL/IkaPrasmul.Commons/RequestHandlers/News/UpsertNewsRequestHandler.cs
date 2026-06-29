using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Exceptions;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.News;
using IkaPrasmul.Entities;
using NewsEntity = IkaPrasmul.Entities.Models.News;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.News;

public class UpsertNewsRequestHandler : IRequestHandler<UpsertNewsRequest, JsonElement>
{
    private const string NewsletterCategory = "Newsletter";

    private readonly ApplicationDbContext _db;
    private readonly IFileStorageService _files;

    public UpsertNewsRequestHandler(ApplicationDbContext db, IFileStorageService files)
    {
        _db = db;
        _files = files;
    }

    public async Task<JsonElement> Handle(UpsertNewsRequest request, CancellationToken ct)
    {
        var lookup = !string.IsNullOrWhiteSpace(request.OriginalSlug)
            ? request.OriginalSlug!
            : request.Slug;

        var entity = await _db.News.FirstOrDefaultAsync(a => a.Slug == lookup, ct);
        bool isUpdate = entity is not null;

        var oldCover = entity?.CoverImage;
        var oldPdf = entity?.PdfUrl;
        var oldBodyUrls = ContentSanitizer.ExtractLocalImageUrls(entity?.Body).ToHashSet();

        var now = DateTime.UtcNow;

        if (entity is null)
        {
            entity = new NewsEntity
            {
                Id = Guid.NewGuid(),
                CreatedAt = now,
                CreatedBy = request.Actor,
                Views = 0,
                SortOrder = (await _db.News.MaxAsync(a => (int?)a.SortOrder, ct) ?? -1) + 1,
            };
            _db.News.Add(entity);
        }
        else
        {
            entity.UpdatedAt = now;
            entity.UpdatedBy = request.Actor;
        }

        if (request.IsFeatured)
        {
            var featuredCount = await _db.News.CountAsync(a => a.IsFeatured && a.Id != entity.Id, ct);
            if (featuredCount >= 1)
                throw new BusinessRuleException("Only 1 news item can be featured at a time. Unfeature the current one before featuring another.");
        }

        if (request.IsTopStory)
        {
            var topStoryCount = await _db.News.CountAsync(a => a.IsTopStory && a.Id != entity.Id, ct);
            if (topStoryCount >= 3)
                throw new BusinessRuleException("Only 3 news items can be Top Stories at a time. Remove a Top Story before adding another.");
        }

        if (request.IsFeaturedHome)
        {
            var homeCount = await _db.News.CountAsync(a => a.IsFeaturedHome && a.Id != entity.Id, ct);
            if (homeCount >= 1)
                throw new BusinessRuleException("Only 1 news item can be shown on the home page at a time. Remove the current one before featuring another.");
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
        entity.CoverImage = request.CoverImage;
        entity.PublishedAt = request.PublishedAt;
        entity.ReadMinutes = request.ReadMinutes;
        entity.IsFeatured = request.IsFeatured;
        entity.IsTopStory = request.IsTopStory;
        entity.IsFeaturedHome = request.IsFeaturedHome;
        var isNewsletter = string.Equals(request.Category, NewsletterCategory, StringComparison.OrdinalIgnoreCase);
        entity.Type = isNewsletter ? "newsletter" : "article";
        entity.PdfUrl = isNewsletter ? request.PdfUrl : null;
        entity.Status = request.IsDraft ? ContentStatus.Draft : ContentStatus.Published;

        await _db.SaveChangesAsync(ct);

        if (isUpdate)
        {
            if (oldCover != entity.CoverImage) await _files.DeleteAsync(oldCover, ct);
            if (oldPdf != entity.PdfUrl) await _files.DeleteAsync(oldPdf, ct);
            var newBodyUrls = ContentSanitizer.ExtractLocalImageUrls(entity.Body).ToHashSet();
            foreach (var url in oldBodyUrls.Except(newBodyUrls))
                await _files.DeleteAsync(url, ct);
        }

        return ContentJson.News(entity);
    }

    private async Task<string> EnsureUniqueSlugAsync(string desired, Guid currentId, CancellationToken ct)
    {
        var baseSlug = string.IsNullOrEmpty(desired) ? $"news-{currentId:N}"[..11] : desired;
        var slug = baseSlug;
        var n = 2;
        while (await _db.News.AnyAsync(a => a.Slug == slug && a.Id != currentId, ct))
        {
            slug = $"{baseSlug}-{n++}";
        }
        return slug;
    }
}
