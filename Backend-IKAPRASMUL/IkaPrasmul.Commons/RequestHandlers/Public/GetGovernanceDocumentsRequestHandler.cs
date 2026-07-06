using System.Text.Json;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.Public;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Public;

public class GetGovernanceDocumentsRequestHandler : IRequestHandler<GetGovernanceDocumentsRequest, List<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetGovernanceDocumentsRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<List<JsonElement>> Handle(GetGovernanceDocumentsRequest request, CancellationToken ct)
    {
        var rows = await _db.GovernanceDocuments
            .OrderBy(d => d.SortOrder)
            .ToListAsync(ct);
        return rows.Select(ContentJson.GovernanceDocument).ToList();
    }
}
