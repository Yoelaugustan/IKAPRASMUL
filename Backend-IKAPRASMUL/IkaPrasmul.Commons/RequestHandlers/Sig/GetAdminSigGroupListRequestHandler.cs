using System.Text.Json;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Sig;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Sig;

public class GetAdminSigGroupListRequestHandler
    : IRequestHandler<GetAdminSigGroupListRequest, List<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetAdminSigGroupListRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<List<JsonElement>> Handle(GetAdminSigGroupListRequest request, CancellationToken ct)
    {
        var rows = await _db.SigGroups.OrderBy(g => g.SortOrder).ToListAsync(ct);
        return rows.Select(ContentJson.SigGroup).ToList();
    }
}
