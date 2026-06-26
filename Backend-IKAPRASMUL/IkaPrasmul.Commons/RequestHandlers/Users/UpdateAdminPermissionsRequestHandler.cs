using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Exceptions;
using IkaPrasmul.Contracts.RequestModels.Users;
using IkaPrasmul.Contracts.ResponseModels.Users;
using IkaPrasmul.Entities.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace IkaPrasmul.Commons.RequestHandlers.Users;

public class UpdateAdminPermissionsRequestHandler : IRequestHandler<UpdateAdminPermissionsRequest, AdminUserDto>
{
    private readonly UserManager<User> _users;

    public UpdateAdminPermissionsRequestHandler(UserManager<User> users) => _users = users;

    public async Task<AdminUserDto> Handle(UpdateAdminPermissionsRequest request, CancellationToken ct)
    {
        var user = await _users.FindByIdAsync(request.UserId.ToString())
            ?? throw new NotFoundException("Admin user not found.");

        if (await _users.IsInRoleAsync(user, Roles.SuperAdmin))
            throw new BusinessRuleException("Cannot modify SuperAdmin permissions.");

        var validSections = request.Permissions
            .Where(p => Sections.All.Contains(p, StringComparer.OrdinalIgnoreCase))
            .Select(p => p.ToLowerInvariant())
            .Distinct()
            .ToList();

        user.Permissions = validSections.Count > 0 ? string.Join(",", validSections) : null;
        await _users.UpdateAsync(user);

        return new AdminUserDto(
            user.Id,
            user.Email ?? string.Empty,
            Roles.Admin,
            validSections,
            user.CreatedAt);
    }
}
