using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.Auth;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Auth;

/// <summary>Revokes the supplied refresh token. Idempotent — unknown/already-revoked
/// tokens succeed silently so sign-out never leaks token validity.</summary>
public class LogoutRequestHandler : IRequestHandler<LogoutRequest, Unit>
{
    private readonly ITokenService _tokens;
    private readonly ApplicationDbContext _db;

    public LogoutRequestHandler(ITokenService tokens, ApplicationDbContext db)
    {
        _tokens = tokens;
        _db = db;
    }

    public async Task<Unit> Handle(LogoutRequest request, CancellationToken cancellationToken)
    {
        if (!string.IsNullOrWhiteSpace(request.RefreshToken))
        {
            var hash = _tokens.HashRefreshToken(request.RefreshToken);
            var stored = await _db.RefreshTokens
                .FirstOrDefaultAsync(t => t.TokenHash == hash, cancellationToken);

            if (stored is not null && stored.RevokedAt is null)
            {
                stored.RevokedAt = DateTime.UtcNow;
                await _db.SaveChangesAsync(cancellationToken);
            }
        }

        return Unit.Value;
    }
}
