using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.GovernanceDocument;

/// <summary>Delete a Governance Document by Id (Admin only). Idempotent.</summary>
public class DeleteGovernanceDocumentRequest : IRequest<Unit>
{
    public string Id { get; set; } = string.Empty;

    public DeleteGovernanceDocumentRequest() { }
    public DeleteGovernanceDocumentRequest(string id) => Id = id;
}
