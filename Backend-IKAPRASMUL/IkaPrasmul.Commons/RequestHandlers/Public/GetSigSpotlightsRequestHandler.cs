using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Public;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Public;

public class GetSigSpotlightsRequestHandler : IRequestHandler<GetSigSpotlightsRequest, List<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetSigSpotlightsRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<List<JsonElement>> Handle(GetSigSpotlightsRequest request, CancellationToken ct)
    {
        var rows = await _db.SigSpotlights
            .Where(s => s.Status == ContentStatus.Published && s.IsSpotlight)
            .OrderBy(s => s.SortOrder)
            .ToListAsync(ct);
        return rows.Select(ContentJson.SigSpotlight).ToList();
    }
}
