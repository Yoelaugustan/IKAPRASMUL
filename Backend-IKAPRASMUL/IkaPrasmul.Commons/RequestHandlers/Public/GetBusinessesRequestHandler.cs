using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Public;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Public;

public class GetBusinessesRequestHandler : IRequestHandler<GetBusinessesRequest, List<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetBusinessesRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<List<JsonElement>> Handle(GetBusinessesRequest request, CancellationToken ct)
    {
        var rows = await _db.BusinessListings
            .Where(b => b.Status == ContentStatus.Published)
            .OrderBy(b => b.SortOrder)
            .ToListAsync(ct);
        return rows.Select(ContentJson.Business).ToList();
    }
}
