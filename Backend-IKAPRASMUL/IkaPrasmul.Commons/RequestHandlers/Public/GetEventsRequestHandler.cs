using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Public;
using IkaPrasmul.Contracts.ResponseModels;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Public;

public class GetEventsRequestHandler : IRequestHandler<GetEventsRequest, PagedResult<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetEventsRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<PagedResult<JsonElement>> Handle(GetEventsRequest request, CancellationToken ct)
    {
        var query = _db.Events.Where(e => e.Status == ContentStatus.Published);

        if (request.IsFeatured.HasValue)     query = query.Where(e => e.IsFeatured     == request.IsFeatured.Value);
        if (request.IsFeaturedHome.HasValue) query = query.Where(e => e.IsFeaturedHome == request.IsFeaturedHome.Value);
        if (!string.IsNullOrWhiteSpace(request.Category)) query = query.Where(e => e.Category == request.Category);
        if (!string.IsNullOrWhiteSpace(request.Date))     query = query.Where(e => e.Date != null && e.Date.StartsWith(request.Date));

        var ordered = string.IsNullOrWhiteSpace(request.Sort)
            ? query.OrderBy(e => e.SortOrder)
            : request.Sort.ToLower() switch
            {
                "date_desc" => query.OrderByDescending(e => e.Date),
                "newest"    => query.OrderByDescending(e => e.CreatedAt),
                _           => query.OrderBy(e => e.Date),
            };

        var total = await ordered.CountAsync(ct);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);
        var items = await ordered
            .Skip((request.Page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(ct);

        return new PagedResult<JsonElement>(items.Select(ContentJson.Event).ToList(), total, request.Page, pageSize);
    }
}
