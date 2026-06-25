using System.Text.Json;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Story;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Story;

public class GetAdminStoryListRequestHandler
    : IRequestHandler<GetAdminStoryListRequest, List<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetAdminStoryListRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<List<JsonElement>> Handle(GetAdminStoryListRequest request, CancellationToken ct)
    {
        var rows = await _db.Stories
            .OrderByDescending(s => s.CreatedAt)
            .ToListAsync(ct);
        return rows.Select(ContentJson.Story).ToList();
    }
}
