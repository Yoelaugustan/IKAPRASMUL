using System.Text.Json;
using IkaPrasmul.Contracts.ResponseModels;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Public;

/// <summary>Public: published Alumni Stories, filterable and paginated.</summary>
public class GetStoriesRequest : IRequest<PagedResult<JsonElement>>
{
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 12;
    public bool? IsFeatured { get; init; }
    public bool? IsHighlight { get; init; }
    public bool? IsFeaturedHome { get; init; }
    public string? Category { get; init; }
    /// <summary>newest | oldest | az | za (null → SortOrder)</summary>
    public string? Sort { get; init; }
}
