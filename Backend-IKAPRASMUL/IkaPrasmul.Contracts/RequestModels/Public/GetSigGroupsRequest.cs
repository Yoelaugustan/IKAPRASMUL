using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Public;

/// <summary>Public: published SIG groups.</summary>
public class GetSigGroupsRequest : IRequest<List<JsonElement>>
{
}
