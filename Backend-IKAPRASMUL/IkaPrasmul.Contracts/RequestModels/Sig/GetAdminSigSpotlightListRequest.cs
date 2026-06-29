using System.Text.Json;
using IkaPrasmul.Contracts.ResponseModels;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Sig;

/// <summary>Admin SIG spotlight list — includes drafts (Admin only).</summary>
public class GetAdminSigSpotlightListRequest : IRequest<PagedResult<JsonElement>>
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 500;
    public string? Search { get; set; }
    /// <summary>newest | oldest | az | za</summary>
    public string? Sort { get; set; }
}
