using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.Content;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Content;

public class GetContentSingleRequestHandler
    : IRequestHandler<GetContentSingleRequest, JsonElement?>
{
    private readonly ApplicationDbContext _db;

    public GetContentSingleRequestHandler(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<JsonElement?> Handle(
        GetContentSingleRequest request,
        CancellationToken cancellationToken)
    {
        var json = await _db.ContentItems
            .Where(c => c.Type == request.Type && c.Status == ContentStatus.Published)
            .OrderBy(c => c.SortOrder)
            .Select(c => c.Json)
            .FirstOrDefaultAsync(cancellationToken);

        return json is null
            ? (JsonElement?)null
            : JsonSerializer.Deserialize<JsonElement>(json);
    }
}
