using System.Text.Json;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Sig;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Sig;

public class GetAdminSigSpotlightListRequestHandler
    : IRequestHandler<GetAdminSigSpotlightListRequest, List<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetAdminSigSpotlightListRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<List<JsonElement>> Handle(GetAdminSigSpotlightListRequest request, CancellationToken ct)
    {
        var rows = await _db.SigSpotlights.OrderByDescending(s => s.CreatedAt).ToListAsync(ct);
        return rows.Select(ContentJson.SigSpotlight).ToList();
    }
}
