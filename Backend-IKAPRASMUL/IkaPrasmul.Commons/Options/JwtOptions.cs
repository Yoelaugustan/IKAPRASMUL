namespace IkaPrasmul.Commons.Options;

/// <summary>JWT settings bound from the "Jwt" config section. The secret is loaded
/// from user-secrets/env, never committed (security-standard §11).</summary>
public class JwtOptions
{
    public const string SectionName = "Jwt";

    public string Secret { get; set; } = string.Empty;
    public string Issuer { get; set; } = "ikaprasmul-api";
    public string Audience { get; set; } = "ikaprasmul-web";
    public int AccessTokenExpiryMinutes { get; set; } = 15;
    public int RefreshTokenExpiryDays { get; set; } = 1;
}
