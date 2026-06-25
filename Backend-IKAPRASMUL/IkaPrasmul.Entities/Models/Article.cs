using System.ComponentModel.DataAnnotations;
using IkaPrasmul.Entities.Interfaces;

namespace IkaPrasmul.Entities.Models;

/// <summary>
/// A News &amp; Insight article. A "Newsletter"-category article opens a PDF
/// (<see cref="PdfUrl"/>) instead of a body detail page (<see cref="Type"/>).
/// </summary>
public class Article : IHaveCreateAndUpdateAudit
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

    [StringLength(500)]
    public string? CoverImage { get; set; }

    /// <summary>ISO date string as entered in the admin form (e.g. "2026-06-24").</summary>
    [StringLength(40)]
    public string? PublishedAt { get; set; }

    public int ReadMinutes { get; set; }

    /// <summary>Powers the "Most Popular" ranking; incremented by views, not admin-set.</summary>
    public long Views { get; set; }

    public bool IsFeatured { get; set; }

    /// <summary>Pinned to the Top Stories section on the news page (max 3). Independent of <see cref="IsFeatured"/>.</summary>
    public bool IsTopStory { get; set; }

    /// <summary>"article" | "newsletter".</summary>
    [StringLength(20)]
    public string? Type { get; set; }

    [StringLength(500)]
    public string? PdfUrl { get; set; }

    [Required]
    [StringLength(20)]
    public string Status { get; set; } = "Published";

    public int SortOrder { get; set; }

    public DateTime CreatedAt { get; set; }
    [StringLength(256)] public string? CreatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; }
    [StringLength(256)] public string? UpdatedBy { get; set; }
}
