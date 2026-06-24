using IkaPrasmul.Entities.Models;

namespace IkaPrasmul.Commons.Services;

/// <summary>A signed access token plus its expiry.</summary>
public record AccessToken(string Token, DateTime ExpiresAt);

/// <summary>Issues JWT access tokens and opaque refresh tokens (security-standard §2.3).</summary>
public interface ITokenService
{
    AccessToken CreateAccessToken(User user, IEnumerable<string> roles);

    /// <summary>A new cryptographically-random opaque refresh token (raw value).</summary>
    string GenerateRefreshToken();

    /// <summary>SHA-256 (Base64) hash of a raw refresh token — only the hash is stored.</summary>
    string HashRefreshToken(string rawToken);
}
