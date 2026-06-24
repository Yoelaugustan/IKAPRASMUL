using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Public;

/// <summary>Public: published Alumni Businesses.</summary>
public class GetBusinessesRequest : IRequest<List<JsonElement>>
{
}
