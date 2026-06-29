using System.Text.Json;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.News;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.News;

public class GetAdminNewsListRequestHandler : IRequestHandler<GetAdminNewsListRequest, List<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetAdminNewsListRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<List<JsonElement>> Handle(GetAdminNewsListRequest request, CancellationToken ct)
    {
        var rows = await _db.News.OrderByDescending(a => a.CreatedAt).ToListAsync(ct);
        return rows.Select(ContentJson.News).ToList();
    }
}
