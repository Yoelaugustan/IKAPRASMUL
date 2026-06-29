using System.Text.Json;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Sig;
using IkaPrasmul.Contracts.ResponseModels;
using IkaPrasmul.Entities;
using IkaPrasmul.Entities.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Sig;

public class GetAdminSigGroupListRequestHandler
    : IRequestHandler<GetAdminSigGroupListRequest, PagedResult<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetAdminSigGroupListRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<PagedResult<JsonElement>> Handle(GetAdminSigGroupListRequest request, CancellationToken ct)
    {
        IQueryable<SigGroup> baseQuery = _db.SigGroups;
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var s = request.Search.Trim().ToLower();
            baseQuery = baseQuery.Where(x => x.Name.ToLower().Contains(s));
        }

        IQueryable<SigGroup> query = request.Sort?.ToLower() switch
        {
            "oldest" => baseQuery.OrderBy(x => x.CreatedAt),
            "az"     => baseQuery.OrderBy(x => x.Name),
            "za"     => baseQuery.OrderByDescending(x => x.Name),
            _        => baseQuery.OrderByDescending(x => x.CreatedAt),
        };

        var total = await query.CountAsync(ct);
        var pageSize = Math.Clamp(request.PageSize, 1, 1000);
        var items = await query.Skip((request.Page - 1) * pageSize).Take(pageSize).ToListAsync(ct);
        return new PagedResult<JsonElement>(items.Select(ContentJson.SigGroup).ToList(), total, request.Page, pageSize);
    }
}
