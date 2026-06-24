using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.News;

/// <summary>Admin article list — includes drafts (Admin only).</summary>
public class GetAdminArticleListRequest : IRequest<List<JsonElement>>
{
}
