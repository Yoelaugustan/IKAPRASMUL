using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Exceptions;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.News;
using IkaPrasmul.Entities;
using IkaPrasmul.Entities.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.News;

public class UpsertArticleRequestHandler : IRequestHandler<UpsertArticleRequest, JsonElement>
{
    private const string NewsletterCategory = "Newsletter";

    private readonly ApplicationDbContext _db;

    public UpsertArticleRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<JsonElement> Handle(UpsertArticleRequest request, CancellationToken ct)
    {
        var lookup = !string.IsNullOrWhiteSpace(request.OriginalSlug)
            ? request.OriginalSlug!
            : request.Slug;

        var entity = await _db.Articles.FirstOrDefaultAsync(a => a.Slug == lookup, ct);
        var now = DateTime.UtcNow;

        if (entity is null)
        {
            entity = new Article
            {
                Id = Guid.NewGuid(),
                CreatedAt = now,
                CreatedBy = request.Actor,
                Views = 0, // server-tracked from real page views, never admin-set
                SortOrder = (await _db.Articles.MaxAsync(a => (int?)a.SortOrder, ct) ?? -1) + 1,
            };
            _db.Articles.Add(entity);
        }
        else
        {
            entity.UpdatedAt = now;
            entity.UpdatedBy = request.Actor;
            // Views is preserved across edits.
        }

        if (request.IsFeatured)
        {
            var featuredCount = await _db.Articles.CountAsync(a => a.IsFeatured && a.Id != entity.Id, ct);
            if (featuredCount >= 1)
                throw new BusinessRuleException("Only 1 article can be featured at a time. Unfeature the current article before featuring another.");
        }

        if (request.IsTopStory)
        {
            var topStoryCount = await _db.Articles.CountAsync(a => a.IsTopStory && a.Id != entity.Id, ct);
            if (topStoryCount >= 3)
                throw new BusinessRuleException("Only 3 articles can be Top Stories at a time. Remove a Top Story before adding another.");
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
        // A Newsletter article opens a PDF instead of a body page.
        var isNewsletter = string.Equals(request.Category, NewsletterCategory, StringComparison.OrdinalIgnoreCase);
        entity.Type = isNewsletter ? "newsletter" : "article";
        entity.PdfUrl = isNewsletter ? request.PdfUrl : null;
        entity.Status = request.IsDraft ? ContentStatus.Draft : ContentStatus.Published;

        await _db.SaveChangesAsync(ct);
        return ContentJson.Article(entity);
    }

    private async Task<string> EnsureUniqueSlugAsync(string desired, Guid currentId, CancellationToken ct)
    {
        var baseSlug = string.IsNullOrEmpty(desired) ? $"article-{currentId:N}"[..14] : desired;
        var slug = baseSlug;
        var n = 2;
        while (await _db.Articles.AnyAsync(a => a.Slug == slug && a.Id != currentId, ct))
        {
            slug = $"{baseSlug}-{n++}";
        }
        return slug;
    }
}
