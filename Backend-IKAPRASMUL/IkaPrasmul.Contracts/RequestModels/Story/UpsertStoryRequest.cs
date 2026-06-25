using System.Text.Json;
using IkaPrasmul.Contracts.RequestModels.Common;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Story;

/// <summary>Create or update an Alumni Story (Admin only). Explicit allow-list —
/// privileged flags are accepted only here, behind the admin gate (security-standard §3.5).</summary>
public class UpsertStoryRequest : IRequest<JsonElement>
{
    /// <summary>Public key / "Page URL".</summary>
    public string Slug { get; set; } = string.Empty;

    /// <summary>The existing slug when editing (supports renaming the Page URL).</summary>
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
    public bool IsHighlight { get; set; }
    public bool IsFeaturedHome { get; set; }
    public bool IsDraft { get; set; }

    /// <summary>Set server-side from the authenticated admin — never from the client body.</summary>
    public string? Actor { get; set; }
}
