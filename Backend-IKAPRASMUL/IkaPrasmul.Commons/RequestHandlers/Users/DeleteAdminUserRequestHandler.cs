using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Exceptions;
using IkaPrasmul.Contracts.RequestModels.Users;
using IkaPrasmul.Entities.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace IkaPrasmul.Commons.RequestHandlers.Users;

public class DeleteAdminUserRequestHandler : IRequestHandler<DeleteAdminUserRequest, Unit>
{
    private readonly UserManager<User> _users;

    public DeleteAdminUserRequestHandler(UserManager<User> users) => _users = users;

    public async Task<Unit> Handle(DeleteAdminUserRequest request, CancellationToken ct)
    {
        var user = await _users.FindByIdAsync(request.UserId.ToString())
            ?? throw new NotFoundException("Admin user not found.");

        if (await _users.IsInRoleAsync(user, Roles.SuperAdmin))
            throw new BusinessRuleException("Cannot delete a SuperAdmin account.");

        await _users.DeleteAsync(user);
        return Unit.Value;
    }
}
