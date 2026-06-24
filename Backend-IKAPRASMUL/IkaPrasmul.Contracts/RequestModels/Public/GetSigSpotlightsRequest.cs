using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Public;

/// <summary>Public: published SIG spotlights.</summary>
public class GetSigSpotlightsRequest : IRequest<List<JsonElement>>
{
}
