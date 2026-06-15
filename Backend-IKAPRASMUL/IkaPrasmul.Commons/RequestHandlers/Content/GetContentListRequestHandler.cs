using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.Content;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Content;

public class GetContentListRequestHandler
    : IRequestHandler<GetContentListRequest, List<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetContentListRequestHandler(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<List<JsonElement>> Handle(
        GetContentListRequest request,
        CancellationToken cancellationToken)
    {
        var rows = await _db.ContentItems
            .Where(c => c.Type == request.Type && c.Status == ContentStatus.Published)
            .OrderBy(c => c.SortOrder)
            .Select(c => c.Json)
            .ToListAsync(cancellationToken);

        // Standalone JsonElements (own their backing document) so they serialize
        // safely back out of the controller.
        return rows.Select(json => JsonSerializer.Deserialize<JsonElement>(json)).ToList();
    }
}
