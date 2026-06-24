using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Business;

/// <summary>Admin business list — includes drafts (Admin only).</summary>
public class GetAdminBusinessListRequest : IRequest<List<JsonElement>>
{
}
