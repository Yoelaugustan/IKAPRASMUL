using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Public;

/// <summary>Public: events (Home "Upcoming Event").</summary>
public class GetEventsRequest : IRequest<List<JsonElement>>
{
}
