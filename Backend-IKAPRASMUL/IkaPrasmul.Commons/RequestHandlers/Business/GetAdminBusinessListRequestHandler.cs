using System.Text.Json;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Business;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Business;

public class GetAdminBusinessListRequestHandler
    : IRequestHandler<GetAdminBusinessListRequest, List<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetAdminBusinessListRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<List<JsonElement>> Handle(GetAdminBusinessListRequest request, CancellationToken ct)
    {
        var rows = await _db.BusinessListings.OrderBy(b => b.SortOrder).ToListAsync(ct);
        return rows.Select(ContentJson.Business).ToList();
    }
}
