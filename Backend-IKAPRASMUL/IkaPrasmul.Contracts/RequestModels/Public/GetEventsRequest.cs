using System.Text.Json;
using IkaPrasmul.Contracts.ResponseModels;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Public;

/// <summary>Public: published Events, filterable and paginated.</summary>
public class GetEventsRequest : IRequest<PagedResult<JsonElement>>
{
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 12;
    public bool? IsFeatured { get; init; }
    public bool? IsFeaturedHome { get; init; }
    public string? Category { get; init; }
    /// <summary>date_asc | date_desc | newest (null → SortOrder)</summary>
    public string? Sort { get; init; }
    /// <summary>Filter to a specific day: YYYY-MM-DD (matches the Date prefix).</summary>
    public string? Date { get; init; }
}
