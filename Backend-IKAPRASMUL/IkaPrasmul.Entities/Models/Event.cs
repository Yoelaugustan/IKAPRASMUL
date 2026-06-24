using System.ComponentModel.DataAnnotations;
using IkaPrasmul.Entities.Interfaces;

namespace IkaPrasmul.Entities.Models;

/// <summary>An event, surfaced as the Home "Upcoming Event" highlight.</summary>
public class Event : IHaveCreateAndUpdateAudit
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [StringLength(220)]
    public string Slug { get; set; } = string.Empty;

    [Required]
    [StringLength(220)]
    public string Title { get; set; } = string.Empty;

    /// <summary>Original ISO date-time string with offset (e.g. "2026-06-23T09:00:00+07:00").</summary>
    [StringLength(40)]
    public string? Date { get; set; }

    [StringLength(300)]
    public string? Location { get; set; }

    [StringLength(500)]
    public string? CoverImage { get; set; }

    public string? Description { get; set; }

    [StringLength(255)]
    public string? RegisterUrl { get; set; }

    [Required]
    [StringLength(20)]
    public string Status { get; set; } = "Published";

    public int SortOrder { get; set; }

    public DateTime CreatedAt { get; set; }
    [StringLength(256)] public string? CreatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; }
    [StringLength(256)] public string? UpdatedBy { get; set; }
}
