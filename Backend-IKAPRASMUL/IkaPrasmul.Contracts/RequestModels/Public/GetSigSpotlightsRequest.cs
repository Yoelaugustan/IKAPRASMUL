using System.Text.Json;
using IkaPrasmul.Contracts.ResponseModels;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Public;

/// <summary>
/// Public: published SIG spotlights, paginated.
/// IsSpotlight defaults to true so the existing sidebar call returns only
/// spotlighted items without needing an explicit query param.
/// </summary>
public class GetSigSpotlightsRequest : IRequest<PagedResult<JsonElement>>
{
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 12;
    public bool? IsSpotlight { get; init; } = true;
}
