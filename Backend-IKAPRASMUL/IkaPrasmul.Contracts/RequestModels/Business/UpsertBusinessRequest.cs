using System.Text.Json;
using IkaPrasmul.Contracts.RequestModels.Common;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Business;

/// <summary>Create or update an Alumni Business (Admin only, allow-list).</summary>
public class UpsertBusinessRequest : IRequest<JsonElement>
{
    public string Slug { get; set; } = string.Empty;
    public string? OriginalSlug { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
    public PersonInput? Founder { get; set; }
    public string? Location { get; set; }
    public string? ShortDescription { get; set; }
    public string? Description { get; set; }
    public string? Logo { get; set; }
    public string? CoverImage { get; set; }
    public string? Website { get; set; }
    public bool IsSpotlight { get; set; }
    public bool IsFeaturedHome { get; set; }
    public bool IsDraft { get; set; }

    public string? Actor { get; set; }
}
