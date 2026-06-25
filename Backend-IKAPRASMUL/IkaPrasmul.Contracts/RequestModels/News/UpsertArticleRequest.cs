using System.Text.Json;
using IkaPrasmul.Contracts.RequestModels.Common;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.News;

/// <summary>Create or update a News &amp; Insight article (Admin only, allow-list).
/// Note: <c>views</c> is server-tracked, not admin-set, so it is intentionally
/// absent; <c>type</c> is derived from the category (Newsletter → newsletter).</summary>
public class UpsertArticleRequest : IRequest<JsonElement>
{
    public string Slug { get; set; } = string.Empty;
    public string? OriginalSlug { get; set; }

    public string Title { get; set; } = string.Empty;
    public string? Excerpt { get; set; }
    public string? Body { get; set; }
    public string Category { get; set; } = string.Empty;
    public PersonInput? Author { get; set; }
    public string? CoverImage { get; set; }
    public string? PublishedAt { get; set; }
    public int ReadMinutes { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsTopStory { get; set; }
    public string? PdfUrl { get; set; }
    public bool IsDraft { get; set; }

    public string? Actor { get; set; }
}
