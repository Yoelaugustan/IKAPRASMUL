using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.Public;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Public;

public class GetEventDatesRequestHandler : IRequestHandler<GetEventDatesRequest, List<string>>
{
    private readonly ApplicationDbContext _db;

    public GetEventDatesRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<List<string>> Handle(GetEventDatesRequest request, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.Month))
            return [];

        return await _db.Events
            .Where(e => e.Status == ContentStatus.Published
                     && e.Date != null
                     && e.Date.StartsWith(request.Month))
            .Select(e => e.Date!.Substring(0, 10))
            .Distinct()
            .OrderBy(d => d)
            .ToListAsync(ct);
    }
}
