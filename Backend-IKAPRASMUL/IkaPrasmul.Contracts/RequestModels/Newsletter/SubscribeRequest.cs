using IkaPrasmul.Contracts.ResponseModels.Newsletter;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Newsletter;

/// <summary>Newsletter signup (footer / News "Stay Informed").</summary>
public class SubscribeRequest : IRequest<SubscribeResponse>
{
    public string Email { get; set; } = string.Empty;

    /// <summary>Optional origin tag, e.g. "footer" or "news".</summary>
    public string? Source { get; set; }
}
