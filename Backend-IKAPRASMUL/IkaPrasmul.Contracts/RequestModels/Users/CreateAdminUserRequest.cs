using IkaPrasmul.Contracts.ResponseModels.Users;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Users;

public class CreateAdminUserRequest : IRequest<AdminUserDto>
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;

    /// <summary>Comma-separated or array of section keys the new admin can access.</summary>
    public IList<string> Permissions { get; set; } = [];
}
