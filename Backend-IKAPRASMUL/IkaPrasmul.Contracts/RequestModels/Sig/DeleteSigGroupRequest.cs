using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Sig;

/// <summary>Delete a SIG Group by key (Admin only). Idempotent.</summary>
public class DeleteSigGroupRequest : IRequest<Unit>
{
    public string Key { get; set; } = string.Empty;

    public DeleteSigGroupRequest() { }
    public DeleteSigGroupRequest(string key) => Key = key;
}
