using System.Text.Json;
using IkaPrasmul.Contracts.ResponseModels;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.News;

/// <summary>Admin news list — includes drafts (Admin only).</summary>
public class GetAdminNewsListRequest : IRequest<PagedResult<JsonElement>>
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 500;
    public string? Search { get; set; }
    /// <summary>newest | oldest | az | za</summary>
    public string? Sort { get; set; }
}
