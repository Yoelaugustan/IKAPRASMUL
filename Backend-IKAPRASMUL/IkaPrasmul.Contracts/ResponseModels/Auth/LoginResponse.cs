namespace IkaPrasmul.Contracts.ResponseModels.Auth;

/// <summary>Tokens issued on a successful admin login or refresh.</summary>
public class LoginResponse
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
    public string Email { get; set; } = string.Empty;
}
