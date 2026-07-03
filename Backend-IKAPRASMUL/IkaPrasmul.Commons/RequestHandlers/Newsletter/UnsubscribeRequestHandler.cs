using IkaPrasmul.Contracts.RequestModels.Newsletter;
using IkaPrasmul.Contracts.ResponseModels.Newsletter;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Newsletter;

public class UnsubscribeRequestHandler : IRequestHandler<UnsubscribeRequest, SubscribeResponse>
{
    private const string Message = "You've been unsubscribed from the newsletter.";

    private readonly ApplicationDbContext _db;

    public UnsubscribeRequestHandler(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<SubscribeResponse> Handle(UnsubscribeRequest request, CancellationToken cancellationToken)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var existing = await _db.NewsletterSubscriptions
            .FirstOrDefaultAsync(s => s.Email == email, cancellationToken);

        if (existing is not null && existing.IsActive)
        {
            existing.IsActive = false;
            existing.UnsubscribedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync(cancellationToken);
        }

        return new SubscribeResponse { Message = Message };
    }
}
