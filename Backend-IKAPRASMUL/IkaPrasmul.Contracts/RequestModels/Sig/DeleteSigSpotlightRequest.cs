using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Sig;

/// <summary>Delete a SIG Spotlight by key (Admin only). Idempotent.</summary>
public class DeleteSigSpotlightRequest : IRequest<Unit>
{
    public string Key { get; set; } = string.Empty;

    public DeleteSigSpotlightRequest() { }
    public DeleteSigSpotlightRequest(string key) => Key = key;
}
