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
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace IkaPrasmul.Commons.RequestHandlers.Auth;

/// <summary>Validates a refresh token and rotates it: the old token is revoked and
/// a brand-new pair is issued (security-standard §2.3).</summary>
public class RefreshTokenRequestHandler : IRequestHandler<RefreshTokenRequest, LoginResponse>
{
    private readonly UserManager<User> _users;
    private readonly ITokenService _tokens;
    private readonly ApplicationDbContext _db;
    private readonly JwtOptions _jwt;

    public RefreshTokenRequestHandler(
        UserManager<User> users,
        ITokenService tokens,
        ApplicationDbContext db,
        IOptions<JwtOptions> jwt)
    {
        _users = users;
        _tokens = tokens;
        _db = db;
        _jwt = jwt.Value;
    }

    public async Task<LoginResponse> Handle(RefreshTokenRequest request, CancellationToken cancellationToken)
    {
        var hash = _tokens.HashRefreshToken(request.RefreshToken);
        var stored = await _db.RefreshTokens
            .FirstOrDefaultAsync(t => t.TokenHash == hash, cancellationToken);

        if (stored is null || !stored.IsActive)
        {
            throw new UnauthorizedException("Invalid or expired refresh token");
        }

        var user = await _users.FindByIdAsync(stored.UserId.ToString())
            ?? throw new UnauthorizedException("Invalid or expired refresh token");

        var roles = await _users.GetRolesAsync(user);
        IEnumerable<string>? permissions = roles.Contains(Roles.SuperAdmin) ? null
            : user.Permissions?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries) ?? [];
        var access = _tokens.CreateAccessToken(user, roles, permissions);

        var now = DateTime.UtcNow;
        var newRaw = _tokens.GenerateRefreshToken();
        var newHash = _tokens.HashRefreshToken(newRaw);

        stored.RevokedAt = now;
        stored.ReplacedByTokenHash = newHash;
        _db.RefreshTokens.Add(new RefreshToken
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            TokenHash = newHash,
            ExpiresAt = now.AddDays(_jwt.RefreshTokenExpiryDays),
            CreatedAt = now,
        });
        await _db.SaveChangesAsync(cancellationToken);

        return new LoginResponse
        {
            AccessToken = access.Token,
            RefreshToken = newRaw,
            ExpiresAt = access.ExpiresAt,
            Email = user.Email ?? string.Empty,
        };
    }
}
