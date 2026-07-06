using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.GovernanceDocument;

/// <summary>Create or update a Governance Document (Admin only). <see cref="Id"/>
/// is whatever the client currently has (ignored on create); <see cref="OriginalId"/>
/// is the real Id to look up when editing an existing record.</summary>
public class UpsertGovernanceDocumentRequest : IRequest<JsonElement>
{
    public string? Id { get; set; }
    public string? OriginalId { get; set; }

    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string PdfUrl { get; set; } = string.Empty;
    /// <summary>Display order on the public carousel (lower = earlier). Auto-assigned
    /// (append to the end) when omitted on create; left unchanged when omitted on update.</summary>
    public int? SortOrder { get; set; }

    public string? Actor { get; set; }
}
