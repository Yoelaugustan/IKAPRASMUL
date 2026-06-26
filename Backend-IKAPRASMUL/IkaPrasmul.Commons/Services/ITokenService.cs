using IkaPrasmul.Entities.Models;

namespace IkaPrasmul.Commons.Services;

/// <summary>A signed access token plus its expiry.</summary>
public record AccessToken(string Token, DateTime ExpiresAt);

/// <summary>Issues JWT access tokens and opaque refresh tokens (security-standard §2.3).</summary>
public interface ITokenService
{
    /// <summary>Creates an access token. Pass <paramref name="permissions"/> for normal
    /// Admin users (embedded as the <c>perms</c> claim). SuperAdmins pass null — they
    /// bypass all section checks server-side.</summary>
    AccessToken CreateAccessToken(User user, IEnumerable<string> roles, IEnumerable<string>? permissions = null);

    /// <summary>A new cryptographically-random opaque refresh token (raw value).</summary>
    string GenerateRefreshToken();

    /// <summary>SHA-256 (Base64) hash of a raw refresh token — only the hash is stored.</summary>
    string HashRefreshToken(string rawToken);
}
