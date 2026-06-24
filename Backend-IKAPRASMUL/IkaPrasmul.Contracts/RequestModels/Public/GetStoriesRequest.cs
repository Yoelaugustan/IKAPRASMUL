using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Public;

/// <summary>Public: published Alumni Stories.</summary>
public class GetStoriesRequest : IRequest<List<JsonElement>>
{
}
