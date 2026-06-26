using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.Users;
using IkaPrasmul.Contracts.ResponseModels.Users;
using IkaPrasmul.Entities.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace IkaPrasmul.Commons.RequestHandlers.Users;

public class GetAdminUsersRequestHandler : IRequestHandler<GetAdminUsersRequest, List<AdminUserDto>>
{
    private readonly UserManager<User> _users;

    public GetAdminUsersRequestHandler(UserManager<User> users) => _users = users;

    public async Task<List<AdminUserDto>> Handle(GetAdminUsersRequest request, CancellationToken ct)
    {
        var superAdmins = await _users.GetUsersInRoleAsync(Roles.SuperAdmin);
        var admins = await _users.GetUsersInRoleAsync(Roles.Admin);

        return superAdmins
            .Select(u => ToDto(u, Roles.SuperAdmin))
            .Concat(admins.Select(u => ToDto(u, Roles.Admin)))
            .OrderBy(u => u.CreatedAt)
            .ToList();
    }

    private static AdminUserDto ToDto(User u, string role) =>
        new(
            u.Id,
            u.Email ?? string.Empty,
            role,
            role == Roles.Admin
                ? u.Permissions?
                    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                    .ToArray() ?? []
                : [],
            u.CreatedAt);
}
