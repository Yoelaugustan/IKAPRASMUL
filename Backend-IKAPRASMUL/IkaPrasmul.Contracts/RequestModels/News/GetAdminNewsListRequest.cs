using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.News;

/// <summary>Admin news list — includes drafts (Admin only).</summary>
public class GetAdminNewsListRequest : IRequest<List<JsonElement>>
{
}
