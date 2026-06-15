using IkaPrasmul.Contracts.RequestModels.Newsletter;
using IkaPrasmul.Contracts.ResponseModels.Newsletter;
using IkaPrasmul.Entities;
using IkaPrasmul.Entities.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Newsletter;

public class SubscribeRequestHandler
    : IRequestHandler<SubscribeRequest, SubscribeResponse>
{
    private const string AlreadyMessage = "You're subscribed — thanks for joining!";

    private readonly ApplicationDbContext _db;

    public SubscribeRequestHandler(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<SubscribeResponse> Handle(
        SubscribeRequest request,
        CancellationToken cancellationToken)
    {
        // Normalise so "A@x.com" and "a@x.com" are the same subscriber.
        var email = request.Email.Trim().ToLowerInvariant();

        var existing = await _db.NewsletterSubscriptions
            .FirstOrDefaultAsync(s => s.Email == email, cancellationToken);

        if (existing is not null)
        {
            // Re-subscribe a previously unsubscribed email; otherwise no-op.
            if (!existing.IsActive)
            {
                existing.IsActive = true;
                existing.UnsubscribedAt = null;
                existing.ConsentAt = DateTime.UtcNow;
                await _db.SaveChangesAsync(cancellationToken);
            }

            return new SubscribeResponse { Message = AlreadyMessage };
        }

        _db.NewsletterSubscriptions.Add(new NewsletterSubscription
        {
            Id = Guid.NewGuid(),
            Email = email,
            IsActive = true,
            Source = request.Source?.Trim(),
            ConsentAt = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow,
        });
        await _db.SaveChangesAsync(cancellationToken);

        return new SubscribeResponse { Message = AlreadyMessage };
    }
}
