using System.Text.Json;
using IkaPrasmul.Commons.Mapping;
using IkaPrasmul.Contracts.RequestModels.GovernanceDocument;
using IkaPrasmul.Contracts.ResponseModels;
using IkaPrasmul.Entities;
using GovernanceDocumentEntity = IkaPrasmul.Entities.Models.GovernanceDocument;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.GovernanceDocument;

public class GetAdminGovernanceDocumentListRequestHandler
    : IRequestHandler<GetAdminGovernanceDocumentListRequest, PagedResult<JsonElement>>
{
    private readonly ApplicationDbContext _db;

    public GetAdminGovernanceDocumentListRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<PagedResult<JsonElement>> Handle(GetAdminGovernanceDocumentListRequest request, CancellationToken ct)
    {
        IQueryable<GovernanceDocumentEntity> baseQuery = _db.GovernanceDocuments;
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var s = request.Search.Trim().ToLower();
            baseQuery = baseQuery.Where(x => x.Title.ToLower().Contains(s));
        }

        IQueryable<GovernanceDocumentEntity> query = request.Sort?.ToLower() switch
        {
            "oldest" => baseQuery.OrderBy(x => x.CreatedAt),
            "az" => baseQuery.OrderBy(x => x.Title),
            "za" => baseQuery.OrderByDescending(x => x.Title),
            _ => baseQuery.OrderBy(x => x.SortOrder),
        };

        var total = await query.CountAsync(ct);
        var pageSize = Math.Clamp(request.PageSize, 1, 1000);
        var items = await query.Skip((request.Page - 1) * pageSize).Take(pageSize).ToListAsync(ct);
        return new PagedResult<JsonElement>(items.Select(ContentJson.GovernanceDocument).ToList(), total, request.Page, pageSize);
    }
}
