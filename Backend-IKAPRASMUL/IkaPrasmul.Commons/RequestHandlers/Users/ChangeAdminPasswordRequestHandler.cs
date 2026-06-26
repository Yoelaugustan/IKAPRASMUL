using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Exceptions;
using IkaPrasmul.Contracts.RequestModels.Users;
using IkaPrasmul.Entities.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace IkaPrasmul.Commons.RequestHandlers.Users;

public class ChangeAdminPasswordRequestHandler : IRequestHandler<ChangeAdminPasswordRequest, Unit>
{
    private readonly UserManager<User> _users;

    public ChangeAdminPasswordRequestHandler(UserManager<User> users) => _users = users;

    public async Task<Unit> Handle(ChangeAdminPasswordRequest request, CancellationToken ct)
    {
        var user = await _users.FindByIdAsync(request.UserId.ToString())
            ?? throw new NotFoundException("Admin user not found.");

        if (await _users.IsInRoleAsync(user, Roles.SuperAdmin))
            throw new BusinessRuleException("Cannot change SuperAdmin password via this endpoint.");

        var token = await _users.GeneratePasswordResetTokenAsync(user);
        var result = await _users.ResetPasswordAsync(user, token, request.NewPassword);

        if (!result.Succeeded)
            throw new BusinessRuleException(string.Join("; ", result.Errors.Select(e => e.Description)));

        return Unit.Value;
    }
}
