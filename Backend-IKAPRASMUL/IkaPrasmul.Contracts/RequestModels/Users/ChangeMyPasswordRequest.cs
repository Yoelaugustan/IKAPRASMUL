using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Users;

/// <summary>Self-service password change for the currently authenticated admin
/// (Admin or SuperAdmin) — <see cref="UserId"/> is stamped from the JWT by the
/// controller, never trusted from the request body. Unlike
/// <see cref="ChangeAdminPasswordRequest"/> (a SuperAdmin resetting someone
/// else's password), this requires the caller's current password.</summary>
public class ChangeMyPasswordRequest : IRequest<Unit>
{
    public Guid UserId { get; set; }
    public string CurrentPassword { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
}
