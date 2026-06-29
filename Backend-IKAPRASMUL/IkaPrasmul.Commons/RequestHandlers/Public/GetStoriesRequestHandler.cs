using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Public;
using IkaPrasmul.Contracts.ResponseModels;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Public;

public class GetStoriesRequestHandler : IRequestHandler<GetStoriesRequest, PagedResult<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetStoriesRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<PagedResult<JsonElement>> Handle(GetStoriesRequest request, CancellationToken ct)
    {
        var query = _db.Stories.Where(s => s.Status == ContentStatus.Published);

        if (request.IsFeatured.HasValue)     query = query.Where(s => s.IsFeatured     == request.IsFeatured.Value);
        if (request.IsHighlight.HasValue)    query = query.Where(s => s.IsHighlight    == request.IsHighlight.Value);
        if (request.IsFeaturedHome.HasValue) query = query.Where(s => s.IsFeaturedHome == request.IsFeaturedHome.Value);
        if (!string.IsNullOrWhiteSpace(request.Category)) query = query.Where(s => s.Category == request.Category);

        var ordered = string.IsNullOrWhiteSpace(request.Sort)
            ? query.OrderBy(s => s.SortOrder)
            : request.Sort.ToLower() switch
            {
                "oldest" => query.OrderBy(s => s.CreatedAt),
                "az"     => query.OrderBy(s => s.Title),
                "za"     => query.OrderByDescending(s => s.Title),
                _        => query.OrderByDescending(s => s.CreatedAt),
            };

        var total = await ordered.CountAsync(ct);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);
        var items = await ordered
            .Skip((request.Page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(ct);

        return new PagedResult<JsonElement>(items.Select(ContentJson.Story).ToList(), total, request.Page, pageSize);
    }
}
