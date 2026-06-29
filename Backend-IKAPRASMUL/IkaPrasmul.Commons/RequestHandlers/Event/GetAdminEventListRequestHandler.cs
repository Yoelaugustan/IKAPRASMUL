using System.Text.Json;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Event;
using IkaPrasmul.Contracts.ResponseModels;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Event;

public class GetAdminEventListRequestHandler
    : IRequestHandler<GetAdminEventListRequest, PagedResult<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetAdminEventListRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<PagedResult<JsonElement>> Handle(GetAdminEventListRequest request, CancellationToken ct)
    {
        var baseQuery = _db.Events.AsQueryable();
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var s = request.Search.Trim().ToLower();
            baseQuery = baseQuery.Where(x => x.Title.ToLower().Contains(s) || x.Location.ToLower().Contains(s));
        }

        var query = request.Sort?.ToLower() switch
        {
            "oldest" => baseQuery.OrderBy(x => x.CreatedAt),
            "az"     => baseQuery.OrderBy(x => x.Title),
            "za"     => baseQuery.OrderByDescending(x => x.Title),
            _        => baseQuery.OrderByDescending(x => x.CreatedAt),
        };

        var total = await query.CountAsync(ct);
        var pageSize = Math.Clamp(request.PageSize, 1, 1000);
        var items = await query.Skip((request.Page - 1) * pageSize).Take(pageSize).ToListAsync(ct);
        return new PagedResult<JsonElement>(items.Select(ContentJson.Event).ToList(), total, request.Page, pageSize);
    }
}
