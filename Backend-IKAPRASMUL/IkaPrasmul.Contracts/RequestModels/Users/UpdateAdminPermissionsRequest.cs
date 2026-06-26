using IkaPrasmul.Contracts.ResponseModels.Users;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Users;

public class UpdateAdminPermissionsRequest : IRequest<AdminUserDto>
{
    public Guid UserId { get; set; }
    public IList<string> Permissions { get; set; } = [];
}
