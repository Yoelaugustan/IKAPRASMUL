using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Public;
using IkaPrasmul.Contracts.ResponseModels;
using IkaPrasmul.Entities;
using IkaPrasmul.Entities.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Public;

public class GetBusinessesRequestHandler : IRequestHandler<GetBusinessesRequest, PagedResult<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetBusinessesRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<PagedResult<JsonElement>> Handle(GetBusinessesRequest request, CancellationToken ct)
    {
        var query = _db.BusinessListings.Where(b => b.Status == ContentStatus.Published);

        if (request.IsFeatured.HasValue)     query = query.Where(b => b.IsFeatured     == request.IsFeatured.Value);
        if (request.IsSpotlight.HasValue)    query = query.Where(b => b.IsSpotlight    == request.IsSpotlight.Value);
        if (request.IsFeaturedHome.HasValue) query = query.Where(b => b.IsFeaturedHome == request.IsFeaturedHome.Value);
        if (!string.IsNullOrWhiteSpace(request.Industry)) query = query.Where(b => b.Industry == request.Industry);
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var s = request.Search.Trim().ToLower();
            query = query.Where(b => b.Name.ToLower().Contains(s)
                || b.FounderName.ToLower().Contains(s)
                || b.Location.ToLower().Contains(s));
        }

        IQueryable<BusinessListing> ordered = string.IsNullOrWhiteSpace(request.Sort)
            ? query.OrderBy(b => b.SortOrder)
            : request.Sort.ToLower() switch
            {
                "az" => query.OrderBy(b => b.Name),
                "za" => query.OrderByDescending(b => b.Name),
                _    => query.OrderByDescending(b => b.CreatedAt),
            };

        var total = await ordered.CountAsync(ct);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);
        var items = await ordered
            .Skip((request.Page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(ct);

        return new PagedResult<JsonElement>(items.Select(ContentJson.Business).ToList(), total, request.Page, pageSize);
    }
}
