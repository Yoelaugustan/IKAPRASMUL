using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Public;
using IkaPrasmul.Contracts.ResponseModels;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Public;

public class GetSigSpotlightsRequestHandler : IRequestHandler<GetSigSpotlightsRequest, PagedResult<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetSigSpotlightsRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<PagedResult<JsonElement>> Handle(GetSigSpotlightsRequest request, CancellationToken ct)
    {
        var query = _db.SigSpotlights.Where(s => s.Status == ContentStatus.Published);

        if (request.IsSpotlight.HasValue) query = query.Where(s => s.IsSpotlight == request.IsSpotlight.Value);

        var total = await query.CountAsync(ct);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);
        var items = await query
            .OrderBy(s => s.SortOrder)
            .Skip((request.Page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(ct);

        return new PagedResult<JsonElement>(items.Select(ContentJson.SigSpotlight).ToList(), total, request.Page, pageSize);
    }
}
