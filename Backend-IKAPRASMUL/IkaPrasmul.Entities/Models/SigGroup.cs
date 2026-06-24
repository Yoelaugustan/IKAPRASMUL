using System.ComponentModel.DataAnnotations;
using IkaPrasmul.Entities.Interfaces;

namespace IkaPrasmul.Entities.Models;

/// <summary>
/// A Shared Interest Group shown in the public SIG grid. The frontend's <c>id</c>
/// maps to <see cref="Key"/>. SIG groups have no draft state (admin-authored,
/// always published once created).
/// </summary>
public class SigGroup : IHaveCreateAndUpdateAudit
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

    [StringLength(80)]
    public string? Icon { get; set; }

    public int SortOrder { get; set; }

    [Required]
    [StringLength(20)]
    public string Status { get; set; } = "Published";

    public DateTime CreatedAt { get; set; }
    [StringLength(256)] public string? CreatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; }
    [StringLength(256)] public string? UpdatedBy { get; set; }
}
