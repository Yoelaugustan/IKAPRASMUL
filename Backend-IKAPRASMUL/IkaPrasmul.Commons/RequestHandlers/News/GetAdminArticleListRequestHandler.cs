using System.Text.Json;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.News;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.News;

public class GetAdminArticleListRequestHandler
    : IRequestHandler<GetAdminArticleListRequest, List<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetAdminArticleListRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<List<JsonElement>> Handle(GetAdminArticleListRequest request, CancellationToken ct)
    {
        var rows = await _db.Articles.OrderByDescending(a => a.CreatedAt).ToListAsync(ct);
        return rows.Select(ContentJson.Article).ToList();
    }
}
