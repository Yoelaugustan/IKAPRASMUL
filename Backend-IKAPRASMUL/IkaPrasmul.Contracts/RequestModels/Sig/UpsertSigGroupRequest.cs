using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Sig;

/// <summary>Create or update a SIG Group (Admin only). The frontend key is "id".
/// SIG groups have no draft state.</summary>
public class UpsertSigGroupRequest : IRequest<JsonElement>
{
    public string Id { get; set; } = string.Empty;
    public string? OriginalId { get; set; }

    public string Name { get; set; } = string.Empty;
    public string? Image { get; set; }
    public string? Icon { get; set; }

    public string? Actor { get; set; }
}
