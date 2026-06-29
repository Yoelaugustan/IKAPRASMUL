using System.Text.Json;
using IkaPrasmul.Contracts.ResponseModels;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Public;

/// <summary>Public: published Alumni Businesses, filterable and paginated.</summary>
public class GetBusinessesRequest : IRequest<PagedResult<JsonElement>>
{
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 12;
    public bool? IsFeatured { get; init; }
    public bool? IsSpotlight { get; init; }
    public bool? IsFeaturedHome { get; init; }
    public string? Industry { get; init; }
    /// <summary>Case-insensitive substring match on Name, FounderName, and Location.</summary>
    public string? Search { get; init; }
    /// <summary>newest | az | za (null → SortOrder)</summary>
    public string? Sort { get; init; }
}
