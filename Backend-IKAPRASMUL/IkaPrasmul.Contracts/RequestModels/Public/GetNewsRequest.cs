using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Public;

/// <summary>Public: published News &amp; Insight items.</summary>
public class GetNewsRequest : IRequest<List<JsonElement>>
{
}
