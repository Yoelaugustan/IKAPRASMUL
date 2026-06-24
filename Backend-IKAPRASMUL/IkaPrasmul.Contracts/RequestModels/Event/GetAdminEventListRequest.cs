using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Event;

/// <summary>Admin event list (Admin only).</summary>
public class GetAdminEventListRequest : IRequest<List<JsonElement>>
{
}
