using System.ComponentModel.DataAnnotations;
using IkaPrasmul.Entities.Interfaces;

namespace IkaPrasmul.Entities.Models;

/// <summary>
/// An Alumni Story. The frontend's nested <c>author</c> object is flattened into
/// <see cref="AuthorName"/>/<see cref="AuthorClass"/>/<see cref="AuthorRole"/>.
/// Date fields are stored as the original ISO strings for exact round-trip with
/// the client (no timezone drift).
/// </summary>
public class Story : IHaveCreateAndUpdateAudit
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [StringLength(220)]
    public string Slug { get; set; } = string.Empty;

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(600)]
    public string? Excerpt { get; set; }

    /// <summary>Authored HTML — sanitized on save (security-standard §4.3).</summary>
    public string? Body { get; set; }

    [Required]
    [StringLength(60)]
    public string Category { get; set; } = string.Empty;

    [StringLength(150)]
    public string? AuthorName { get; set; }

    [StringLength(60)]
    public string? AuthorClass { get; set; }

    [StringLength(200)]
    public string? AuthorRole { get; set; }

    [StringLength(500)]
    public string? CoverImage { get; set; }

    /// <summary>ISO date string as entered in the admin form (e.g. "2026-06-24").</summary>
    [StringLength(40)]
    public string? PublishedAt { get; set; }

    public int ReadMinutes { get; set; }

    public bool IsFeatured { get; set; }

    /// <summary>Drives the home page Alumni-of-the-Month slot (max 1).</summary>
    public bool IsFeaturedHome { get; set; }

    [Required]
    [StringLength(20)]
    public string Status { get; set; } = "Published";

    public int SortOrder { get; set; }

    public DateTime CreatedAt { get; set; }
    [StringLength(256)] public string? CreatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; }
    [StringLength(256)] public string? UpdatedBy { get; set; }
}
