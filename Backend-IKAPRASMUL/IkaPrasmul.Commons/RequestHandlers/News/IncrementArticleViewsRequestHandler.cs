using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.News;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.News;

public class IncrementArticleViewsRequestHandler : IRequestHandler<IncrementArticleViewsRequest, Unit>
{
    private readonly ApplicationDbContext _db;

    public IncrementArticleViewsRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<Unit> Handle(IncrementArticleViewsRequest request, CancellationToken ct)
    {
        // Atomic bulk-update — no round-trip load, safe under concurrent requests.
        await _db.Articles
            .Where(a => a.Slug == request.Slug && a.Status == ContentStatus.Published)
            .ExecuteUpdateAsync(s => s.SetProperty(a => a.Views, a => a.Views + 1), ct);
        return Unit.Value;
    }
}
