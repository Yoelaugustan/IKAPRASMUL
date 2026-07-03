using IkaPrasmul.Contracts.ResponseModels.Newsletter;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Newsletter;

/// <summary>One-click unsubscribe link sent at the bottom of newsletter emails.</summary>
public class UnsubscribeRequest : IRequest<SubscribeResponse>
{
    public string Email { get; set; } = string.Empty;
}
