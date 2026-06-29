using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.News;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.News;

public class IncrementNewsViewsRequestHandler : IRequestHandler<IncrementNewsViewsRequest, Unit>
{
    private readonly ApplicationDbContext _db;

    public IncrementNewsViewsRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<Unit> Handle(IncrementNewsViewsRequest request, CancellationToken ct)
    {
        // Atomic bulk-update — no round-trip load, safe under concurrent requests.
        await _db.News
            .Where(a => a.Slug == request.Slug && a.Status == ContentStatus.Published)
            .ExecuteUpdateAsync(s => s.SetProperty(a => a.Views, a => a.Views + 1), ct);
        return Unit.Value;
    }
}
