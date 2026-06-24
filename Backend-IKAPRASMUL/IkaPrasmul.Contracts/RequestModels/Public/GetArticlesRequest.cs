using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Public;

/// <summary>Public: published News &amp; Insight articles.</summary>
public class GetArticlesRequest : IRequest<List<JsonElement>>
{
}
