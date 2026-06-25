using System.Text.Json;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Event;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Event;

public class GetAdminEventListRequestHandler
    : IRequestHandler<GetAdminEventListRequest, List<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetAdminEventListRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<List<JsonElement>> Handle(GetAdminEventListRequest request, CancellationToken ct)
    {
        var rows = await _db.Events.OrderByDescending(e => e.CreatedAt).ToListAsync(ct);
        return rows.Select(ContentJson.Event).ToList();
    }
}
