using System.ComponentModel.DataAnnotations;
using IkaPrasmul.Entities.Interfaces;

namespace IkaPrasmul.Entities.Models;

/// <summary>
/// An alumni-founded business. The frontend's nested <c>founder</c> object is
/// flattened into <see cref="FounderName"/>/<see cref="FounderClass"/>.
/// </summary>
public class BusinessListing : IHaveCreateAndUpdateAudit
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [StringLength(180)]
    public string Slug { get; set; } = string.Empty;

    [Required]
    [StringLength(180)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [StringLength(60)]
    public string Industry { get; set; } = string.Empty;

    [StringLength(150)]
    public string? FounderName { get; set; }

    [StringLength(60)]
    public string? FounderClass { get; set; }

    [StringLength(200)]
    public string? Location { get; set; }

    [StringLength(600)]
    public string? ShortDescription { get; set; }

    /// <summary>Authored HTML — sanitized on save (security-standard §4.3).</summary>
    public string? Description { get; set; }

    [StringLength(500)]
    public string? Logo { get; set; }

    [StringLength(500)]
    public string? CoverImage { get; set; }

    [StringLength(255)]
    public string? Website { get; set; }

    /// <summary>Drives the large spotlight card on the business listing page.</summary>
    public bool IsSpotlight { get; set; }

    /// <summary>Drives the featured business slots on the home page (max 2).</summary>
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
