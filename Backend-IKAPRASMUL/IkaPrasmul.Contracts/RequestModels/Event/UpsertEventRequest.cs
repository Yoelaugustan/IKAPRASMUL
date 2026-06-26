using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Event;

/// <summary>Create or update an Event (Admin only, allow-list).</summary>
public class UpsertEventRequest : IRequest<JsonElement>
{
    public string Slug { get; set; } = string.Empty;
    public string? OriginalSlug { get; set; }

    public string Title { get; set; } = string.Empty;
    public string? Date { get; set; }
    public string? Location { get; set; }
    public string? Category { get; set; }
    public string? CoverImage { get; set; }
    public string? Description { get; set; }
    public string? RegisterUrl { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsFeaturedHome { get; set; }
    public bool IsDraft { get; set; }

    public string? Actor { get; set; }
}
