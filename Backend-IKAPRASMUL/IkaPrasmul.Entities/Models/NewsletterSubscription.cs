using System.ComponentModel.DataAnnotations;

namespace IkaPrasmul.Entities.Models;

/// <summary>
/// Footer / "Stay Informed" newsletter signup. Stored for the (future) Hangfire
/// dispatch job. Email is unique (case-insensitive, enforced via a lowercased
/// value + unique index) so a repeat signup re-activates rather than duplicates.
/// </summary>
public class NewsletterSubscription
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [StringLength(255)]
    public string Email { get; set; } = string.Empty;

    /// <summary>False once the subscriber unsubscribes (soft, for GDPR/UU PDP).</summary>
    public bool IsActive { get; set; } = true;

    /// <summary>Where the signup came from (e.g. "footer", "news").</summary>
    [StringLength(40)]
    public string? Source { get; set; }

    /// <summary>Explicit consent timestamp captured at signup (compliance).</summary>
    public DateTime ConsentAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UnsubscribedAt { get; set; }
}
