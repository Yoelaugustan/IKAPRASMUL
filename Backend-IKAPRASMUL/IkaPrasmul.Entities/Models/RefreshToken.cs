using System.ComponentModel.DataAnnotations;

namespace IkaPrasmul.Entities.Models;

/// <summary>
/// A stored refresh token for an admin session. Only the SHA-256 hash of the
/// token is persisted; tokens are rotated on every use (security-standard §2.3).
/// </summary>
public class RefreshToken
{
    [Key]
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    /// <summary>SHA-256 hash (Base64) of the opaque refresh token — never the raw value.</summary>
    [Required]
    [StringLength(128)]
    public string TokenHash { get; set; } = string.Empty;

    public DateTime ExpiresAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? RevokedAt { get; set; }

    /// <summary>Hash of the token that replaced this one on rotation (audit trail).</summary>
    [StringLength(128)]
    public string? ReplacedByTokenHash { get; set; }

    public bool IsActive => RevokedAt is null && DateTime.UtcNow < ExpiresAt;
}
