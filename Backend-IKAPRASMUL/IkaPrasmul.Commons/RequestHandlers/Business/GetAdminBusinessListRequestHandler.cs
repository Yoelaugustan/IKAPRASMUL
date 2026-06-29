using System.Text.Json;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Business;
using IkaPrasmul.Contracts.ResponseModels;
using IkaPrasmul.Entities;
using IkaPrasmul.Entities.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Business;

public class GetAdminBusinessListRequestHandler
    : IRequestHandler<GetAdminBusinessListRequest, PagedResult<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetAdminBusinessListRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<PagedResult<JsonElement>> Handle(GetAdminBusinessListRequest request, CancellationToken ct)
    {
        IQueryable<BusinessListing> baseQuery = _db.BusinessListings;
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var s = request.Search.Trim().ToLower();
            baseQuery = baseQuery.Where(x => x.Name.ToLower().Contains(s)
                || x.FounderName.ToLower().Contains(s)
                || x.Location.ToLower().Contains(s));
        }

        IQueryable<BusinessListing> query = request.Sort?.ToLower() switch
        {
            "oldest" => baseQuery.OrderBy(x => x.CreatedAt),
            "az"     => baseQuery.OrderBy(x => x.Name),
            "za"     => baseQuery.OrderByDescending(x => x.Name),
            _        => baseQuery.OrderByDescending(x => x.CreatedAt),
        };

        var total = await query.CountAsync(ct);
        var pageSize = Math.Clamp(request.PageSize, 1, 1000);
        var items = await query.Skip((request.Page - 1) * pageSize).Take(pageSize).ToListAsync(ct);
        return new PagedResult<JsonElement>(items.Select(ContentJson.Business).ToList(), total, request.Page, pageSize);
    }
}
