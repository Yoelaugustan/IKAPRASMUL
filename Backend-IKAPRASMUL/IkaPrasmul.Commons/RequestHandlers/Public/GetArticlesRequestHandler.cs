using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Public;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Public;

public class GetArticlesRequestHandler : IRequestHandler<GetArticlesRequest, List<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetArticlesRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<List<JsonElement>> Handle(GetArticlesRequest request, CancellationToken ct)
    {
        var rows = await _db.Articles
            .Where(a => a.Status == ContentStatus.Published)
            .OrderBy(a => a.SortOrder)
            .ToListAsync(ct);
        return rows.Select(ContentJson.Article).ToList();
    }
}
