using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Public;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Public;

public class GetStoriesRequestHandler : IRequestHandler<GetStoriesRequest, List<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetStoriesRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<List<JsonElement>> Handle(GetStoriesRequest request, CancellationToken ct)
    {
        var rows = await _db.Stories
            .Where(s => s.Status == ContentStatus.Published)
            .OrderBy(s => s.SortOrder)
            .ToListAsync(ct);
        return rows.Select(ContentJson.Story).ToList();
    }
}
