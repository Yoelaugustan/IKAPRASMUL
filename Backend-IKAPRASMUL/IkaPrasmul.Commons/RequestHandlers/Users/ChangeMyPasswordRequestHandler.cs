using IkaPrasmul.Commons.Exceptions;
using IkaPrasmul.Contracts.RequestModels.Users;
using IkaPrasmul.Entities.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace IkaPrasmul.Commons.RequestHandlers.Users;

public class ChangeMyPasswordRequestHandler : IRequestHandler<ChangeMyPasswordRequest, Unit>
{
    private readonly UserManager<User> _users;

    public ChangeMyPasswordRequestHandler(UserManager<User> users) => _users = users;

    public async Task<Unit> Handle(ChangeMyPasswordRequest request, CancellationToken ct)
    {
        var user = await _users.FindByIdAsync(request.UserId.ToString())
            ?? throw new NotFoundException("User not found.");

        var result = await _users.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);

        if (!result.Succeeded)
            throw new BusinessRuleException(string.Join("; ", result.Errors.Select(e => e.Description)));

        return Unit.Value;
    }
}
