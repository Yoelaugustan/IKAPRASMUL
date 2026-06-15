using System.ComponentModel.DataAnnotations;

namespace IkaPrasmul.Entities.Models;

/// <summary>
/// A "Get in Touch" submission. Also backs the Create-a-SIG / List-Your-Business /
/// Submit-Your-Story CTAs (distinguished by <see cref="Subject"/>). Lands in the
/// admin inbox; an email notification is sent on top (see ContactController flow).
/// </summary>
public class ContactInquiry
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [StringLength(150)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [StringLength(255)]
    public string Email { get; set; } = string.Empty;

    /// <summary>Subject/intent (free text from the form's dropdown, e.g. "Submit Your Story").</summary>
    [Required]
    [StringLength(100)]
    public string Subject { get; set; } = string.Empty;

    [Required]
    [StringLength(4000)]
    public string Message { get; set; } = string.Empty;

    /// <summary>Set by an admin once the inquiry has been actioned.</summary>
    public bool IsHandled { get; set; }

    public DateTime CreatedAt { get; set; }
}
