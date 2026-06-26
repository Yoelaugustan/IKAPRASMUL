using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Exceptions;
using IkaPrasmul.Commons.Options;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.Auth;
using IkaPrasmul.Contracts.ResponseModels.Auth;
using IkaPrasmul.Entities;
using IkaPrasmul.Entities.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace IkaPrasmul.Commons.RequestHandlers.Auth;

public class LoginRequestHandler : IRequestHandler<LoginRequest, LoginResponse>
{
    private readonly UserManager<User> _users;
    private readonly ITokenService _tokens;
    private readonly ApplicationDbContext _db;
    private readonly JwtOptions _jwt;
    private readonly ILogger<LoginRequestHandler> _logger;

    public LoginRequestHandler(
        UserManager<User> users,
        ITokenService tokens,
        ApplicationDbContext db,
        IOptions<JwtOptions> jwt,
        ILogger<LoginRequestHandler> logger)
    {
        _users = users;
        _tokens = tokens;
        _db = db;
        _jwt = jwt.Value;
        _logger = logger;
    }

    public async Task<LoginResponse> Handle(LoginRequest request, CancellationToken cancellationToken)
    {
        // Generic failure for both unknown email and wrong password (no enumeration).
        const string invalid = "Invalid email or password";

        var user = await _users.FindByEmailAsync(request.Email.Trim());
        if (user is null || !await _users.CheckPasswordAsync(user, request.Password))
        {
            throw new UnauthorizedException(invalid);
        }

        var roles = await _users.GetRolesAsync(user);
        var permissions = GetPermissions(user, roles);
        var access = _tokens.CreateAccessToken(user, roles, permissions);
        var refreshRaw = _tokens.GenerateRefreshToken();

        var now = DateTime.UtcNow;
        _db.RefreshTokens.Add(new RefreshToken
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            TokenHash = _tokens.HashRefreshToken(refreshRaw),
            ExpiresAt = now.AddDays(_jwt.RefreshTokenExpiryDays),
            CreatedAt = now,
        });
        await _db.SaveChangesAsync(cancellationToken);

        _logger.LogInformation("Admin login succeeded for user {UserId}.", user.Id);

        return new LoginResponse
        {
            AccessToken = access.Token,
            RefreshToken = refreshRaw,
            ExpiresAt = access.ExpiresAt,
            Email = user.Email ?? string.Empty,
        };
    }

    private static IEnumerable<string>? GetPermissions(User user, IList<string> roles)
    {
        if (roles.Contains(Roles.SuperAdmin)) return null;
        return user.Permissions?
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            ?? [];
    }
}
