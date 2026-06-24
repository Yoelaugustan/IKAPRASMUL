using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Public;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Public;

public class GetSigGroupsRequestHandler : IRequestHandler<GetSigGroupsRequest, List<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetSigGroupsRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<List<JsonElement>> Handle(GetSigGroupsRequest request, CancellationToken ct)
    {
        var rows = await _db.SigGroups
            .Where(g => g.Status == ContentStatus.Published)
            .OrderBy(g => g.SortOrder)
            .ToListAsync(ct);
        return rows.Select(ContentJson.SigGroup).ToList();
    }
}
