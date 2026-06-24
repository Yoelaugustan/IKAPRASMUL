using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Public;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Public;

public class GetEventsRequestHandler : IRequestHandler<GetEventsRequest, List<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetEventsRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<List<JsonElement>> Handle(GetEventsRequest request, CancellationToken ct)
    {
        var rows = await _db.Events
            .Where(e => e.Status == ContentStatus.Published)
            .OrderBy(e => e.SortOrder)
            .ToListAsync(ct);
        return rows.Select(ContentJson.Event).ToList();
    }
}
