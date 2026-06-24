using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Auth;

/// <summary>Revokes a refresh token on sign-out (security-standard §2.4).</summary>
public class LogoutRequest : IRequest<Unit>
{
    public string RefreshToken { get; set; } = string.Empty;
}
