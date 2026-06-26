using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Users;

public class ChangeAdminPasswordRequest : IRequest<Unit>
{
    public Guid UserId { get; set; }
    public string NewPassword { get; set; } = string.Empty;
}
