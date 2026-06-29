using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Public;
using IkaPrasmul.Contracts.ResponseModels;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Public;

public class GetNewsRequestHandler : IRequestHandler<GetNewsRequest, PagedResult<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetNewsRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<PagedResult<JsonElement>> Handle(GetNewsRequest request, CancellationToken ct)
    {
        var query = _db.News.Where(a => a.Status == ContentStatus.Published);

        if (request.IsFeatured.HasValue)     query = query.Where(a => a.IsFeatured     == request.IsFeatured.Value);
        if (request.IsTopStory.HasValue)     query = query.Where(a => a.IsTopStory     == request.IsTopStory.Value);
        if (request.IsFeaturedHome.HasValue) query = query.Where(a => a.IsFeaturedHome == request.IsFeaturedHome.Value);
        if (!string.IsNullOrWhiteSpace(request.Category)) query = query.Where(a => a.Category == request.Category);
        if (!string.IsNullOrWhiteSpace(request.Type))     query = query.Where(a => a.Type     == request.Type);
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var s = request.Search.Trim().ToLower();
            query = query.Where(a => a.Title.ToLower().Contains(s) || a.Excerpt.ToLower().Contains(s));
        }

        var ordered = string.IsNullOrWhiteSpace(request.Sort)
            ? query.OrderBy(a => a.SortOrder)
            : request.Sort.ToLower() switch
            {
                "newest"  => query.OrderByDescending(a => a.PublishedAt),
                "oldest"  => query.OrderBy(a => a.PublishedAt),
                "popular" => query.OrderByDescending(a => a.Views),
                _         => query.OrderByDescending(a => a.PublishedAt),
            };

        var total = await ordered.CountAsync(ct);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);
        var items = await ordered
            .Skip((request.Page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(ct);

        return new PagedResult<JsonElement>(items.Select(ContentJson.News).ToList(), total, request.Page, pageSize);
    }
}
