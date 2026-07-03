using IkaPrasmul.Contracts.ResponseModels.News;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.News;

/// <summary>Explicit admin action — send a published Newsletter-type News item
/// to every active newsletter subscriber. Triggered from the admin UI, not
/// automatically on publish.</summary>
public class SendNewsletterRequest : IRequest<SendNewsletterResponse>
{
    public string Slug { get; set; } = string.Empty;
}
