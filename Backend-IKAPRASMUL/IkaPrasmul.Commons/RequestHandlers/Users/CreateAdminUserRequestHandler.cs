using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Exceptions;
using IkaPrasmul.Contracts.RequestModels.Users;
using IkaPrasmul.Contracts.ResponseModels.Users;
using IkaPrasmul.Entities.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace IkaPrasmul.Commons.RequestHandlers.Users;

public class CreateAdminUserRequestHandler : IRequestHandler<CreateAdminUserRequest, AdminUserDto>
{
    private readonly UserManager<User> _users;

    public CreateAdminUserRequestHandler(UserManager<User> users) => _users = users;

    public async Task<AdminUserDto> Handle(CreateAdminUserRequest request, CancellationToken ct)
    {
        var email = request.Email.Trim().ToLowerInvariant();

        if (await _users.FindByEmailAsync(email) is not null)
            throw new BusinessRuleException("An admin with this email already exists.");

        var validSections = request.Permissions
            .Where(p => Sections.All.Contains(p, StringComparer.OrdinalIgnoreCase))
            .Select(p => p.ToLowerInvariant())
            .Distinct()
            .ToList();

        var user = new User
        {
            Id = Guid.NewGuid(),
            UserName = email,
            Email = email,
            EmailConfirmed = true,
            Permissions = validSections.Count > 0 ? string.Join(",", validSections) : null,
        };

        var result = await _users.CreateAsync(user, request.Password);
        if (!result.Succeeded)
            throw new BusinessRuleException(string.Join("; ", result.Errors.Select(e => e.Description)));

        await _users.AddToRoleAsync(user, Roles.Admin);

        return new AdminUserDto(
            user.Id,
            user.Email,
            Roles.Admin,
            validSections,
            user.CreatedAt);
    }
}
