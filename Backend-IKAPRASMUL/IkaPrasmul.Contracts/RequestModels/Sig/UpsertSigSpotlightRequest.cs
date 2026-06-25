using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Sig;

/// <summary>Create or update a SIG Spotlight (Admin only). The frontend key is "id".</summary>
public class UpsertSigSpotlightRequest : IRequest<JsonElement>
{
    public string Id { get; set; } = string.Empty;
    public string? OriginalId { get; set; }

    public string Name { get; set; } = string.Empty;
    public string? Image { get; set; }
    public string? Description { get; set; }
    public bool IsSpotlight { get; set; }
    public bool IsDraft { get; set; }

    public string? Actor { get; set; }
}
