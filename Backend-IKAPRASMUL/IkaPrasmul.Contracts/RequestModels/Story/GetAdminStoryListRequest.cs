using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Story;

/// <summary>Admin story list — includes drafts (Admin only).</summary>
public class GetAdminStoryListRequest : IRequest<List<JsonElement>>
{
}
