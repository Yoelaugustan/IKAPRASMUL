using System.ComponentModel.DataAnnotations;
using IkaPrasmul.Entities.Interfaces;

namespace IkaPrasmul.Entities.Models;

/// <summary>A featured SIG activity highlighted on the public SIG page.</summary>
public class SigSpotlight : IHaveCreateAndUpdateAudit
{
    [Key]
    public Guid Id { get; set; }

    /// <summary>Frontend <c>id</c> — unique, URL-safe key.</summary>
    [Required]
    [StringLength(80)]
    public string Key { get; set; } = string.Empty;

    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;

    [StringLength(500)]
    public string? ImageUrl { get; set; }

    /// <summary>Authored HTML — sanitized on save (security-standard §4.3).</summary>
    public string? Description { get; set; }

    /// <summary>Pinned to the SIG spotlight sidebar on the public SIG page (max 2).</summary>
    public bool IsSpotlight { get; set; }

    public int SortOrder { get; set; }

    /// <summary>Draft or Published. Only Published is publicly readable.</summary>
    [Required]
    [StringLength(20)]
    public string Status { get; set; } = "Published";

    public DateTime CreatedAt { get; set; }
    [StringLength(256)] public string? CreatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; }
    [StringLength(256)] public string? UpdatedBy { get; set; }
}
