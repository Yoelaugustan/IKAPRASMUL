using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.Auth;
using IkaPrasmul.Entities.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace IkaPrasmul.Commons.RequestHandlers.Auth;

/// <summary>
/// Sends an admin password-reset email if the account exists. Always returns
/// success regardless, so an attacker cannot probe which emails are registered
/// (security-standard §2.2). A consuming reset endpoint is out of scope this pass.
/// </summary>
public class ForgotPasswordRequestHandler : IRequestHandler<ForgotPasswordRequest, Unit>
{
    private readonly UserManager<User> _users;
    private readonly IEmailService _email;
    private readonly ILogger<ForgotPasswordRequestHandler> _logger;

    public ForgotPasswordRequestHandler(
        UserManager<User> users,
        IEmailService email,
        ILogger<ForgotPasswordRequestHandler> logger)
    {
        _users = users;
        _email = email;
        _logger = logger;
    }

    public async Task<Unit> Handle(ForgotPasswordRequest request, CancellationToken cancellationToken)
    {
        var user = await _users.FindByEmailAsync(request.Email.Trim());
        if (user is not null && !string.IsNullOrWhiteSpace(user.Email))
        {
            try
            {
                var token = await _users.GeneratePasswordResetTokenAsync(user);
                _logger.LogInformation("Password reset requested for user {UserId}.", user.Id);
                await _email.SendAsync(
                    user.Email,
                    "IKAPRASMUL admin password reset",
                    "<p>A password reset was requested for your IKAPRASMUL admin account. "
                    + "If this was you, use the reset code provided by your administrator.</p>"
                    + $"<p style=\"font-family:monospace;word-break:break-all\">{token}</p>",
                    cancellationToken: cancellationToken);
            }
            catch (Exception ex)
            {
                // Never surface failures to the caller — keep the response generic.
                _logger.LogError(ex, "Failed to send password reset email for user {UserId}.", user.Id);
            }
        }

        return Unit.Value;
    }
}
