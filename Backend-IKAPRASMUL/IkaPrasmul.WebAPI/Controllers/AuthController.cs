using IkaPrasmul.Contracts.RequestModels.Auth;
using IkaPrasmul.Contracts.ResponseModels.Auth;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace IkaPrasmul.WebAPI.Controllers;

/// <summary>Admin authentication (be-standard §6). There is no public sign-up.
/// Login and forgot-password are rate-limited per IP (security-standard §6.3).
/// Refresh and logout are exempt — they are protected by the 64-byte random
/// token value and would be blocked by the same limit under normal CMS use.</summary>
[ApiController]
[Route("api/auth")]
[AllowAnonymous]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator) => _mediator = mediator;

    [HttpPost("login")]
    [EnableRateLimiting(Program.PublicWritePolicy)]
    public async Task<ActionResult<LoginResponse>> Login(
        [FromBody] LoginRequest request, CancellationToken ct) =>
        Ok(await _mediator.Send(request, ct));

    // No rate limiting — the 64-byte random token is the protection.
    [HttpPost("refresh")]
    public async Task<ActionResult<LoginResponse>> Refresh(
        [FromBody] RefreshTokenRequest request, CancellationToken ct) =>
        Ok(await _mediator.Send(request, ct));

    [HttpPost("logout")]
    public async Task<IActionResult> Logout(
        [FromBody] LogoutRequest request, CancellationToken ct)
    {
        await _mediator.Send(request, ct);
        return NoContent();
    }

    [HttpPost("forgot-password")]
    [EnableRateLimiting(Program.PublicWritePolicy)]
    public async Task<IActionResult> ForgotPassword(
        [FromBody] ForgotPasswordRequest request, CancellationToken ct)
    {
        await _mediator.Send(request, ct);
        // Generic response regardless of whether the email exists.
        return Ok(new { message = "If that account exists, a reset email has been sent." });
    }
}
