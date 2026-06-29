using System.Text.Json;
using IkaPrasmul.Contracts.ResponseModels;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Public;

/// <summary>Public: published News &amp; Insight items, filterable and paginated.</summary>
public class GetNewsRequest : IRequest<PagedResult<JsonElement>>
{
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 12;
    public bool? IsFeatured { get; init; }
    public bool? IsTopStory { get; init; }
    public bool? IsFeaturedHome { get; init; }
    public string? Category { get; init; }
    public string? Type { get; init; }
    /// <summary>Case-insensitive substring match on Title and Excerpt.</summary>
    public string? Search { get; init; }
    /// <summary>newest | oldest | popular (null → SortOrder)</summary>
    public string? Sort { get; init; }
}
