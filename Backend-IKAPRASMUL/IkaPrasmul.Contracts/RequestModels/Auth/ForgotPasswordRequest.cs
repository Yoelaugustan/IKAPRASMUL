using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Auth;

/// <summary>Sends an admin password-reset email (always returns generic success).</summary>
public class ForgotPasswordRequest : IRequest<Unit>
{
    public string Email { get; set; } = string.Empty;
}
