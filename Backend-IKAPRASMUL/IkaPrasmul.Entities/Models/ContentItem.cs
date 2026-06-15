using System.ComponentModel.DataAnnotations;

namespace IkaPrasmul.Entities.Models;

/// <summary>
/// A single piece of public content stored as JSON (the exact shape the frontend
/// consumes), tagged by <see cref="Type"/> and ordered by <see cref="SortOrder"/>.
/// This is a pragmatic document-style store for the read-only migration; when the
/// admin CMS is built it can be replaced by rich per-entity tables (be-standard §7)
/// without changing the public API contract.
/// </summary>
public class ContentItem
{
    [Key]
    public Guid Id { get; set; }

    /// <summary>Discriminator: "sig", "story", "business", "article", "event",
    /// "impactStat", "featuredAlumni", "about".</summary>
    [Required]
    [StringLength(40)]
    public string Type { get; set; } = string.Empty;

    /// <summary>Preserves the original ordering of each content list.</summary>
    public int SortOrder { get; set; }

    [Required]
    [StringLength(20)]
    public string Status { get; set; } = "Published";

    /// <summary>The full item serialized as JSON (mapped to a text column).</summary>
    [Required]
    public string Json { get; set; } = string.Empty;
}
