using IkaPrasmul.Contracts.ResponseModels.Auth;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Auth;

/// <summary>Admin sign-in. There is no public registration (be-standard §6.1).</summary>
public class LoginRequest : IRequest<LoginResponse>
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
