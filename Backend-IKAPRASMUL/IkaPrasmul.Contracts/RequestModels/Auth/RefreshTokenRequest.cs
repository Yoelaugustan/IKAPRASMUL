using IkaPrasmul.Contracts.ResponseModels.Auth;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Auth;

/// <summary>Exchanges a valid refresh token for a new token pair (rotation).</summary>
public class RefreshTokenRequest : IRequest<LoginResponse>
{
    public string RefreshToken { get; set; } = string.Empty;
}
