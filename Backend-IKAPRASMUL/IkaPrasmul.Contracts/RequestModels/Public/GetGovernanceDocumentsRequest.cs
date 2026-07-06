using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Public;

/// <summary>Public: all governance documents, ordered by SortOrder.</summary>
public class GetGovernanceDocumentsRequest : IRequest<List<JsonElement>>
{
}
