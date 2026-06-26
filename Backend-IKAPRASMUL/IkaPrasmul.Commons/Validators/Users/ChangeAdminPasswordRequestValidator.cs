using FluentValidation;
using IkaPrasmul.Contracts.RequestModels.Users;

namespace IkaPrasmul.Commons.Validators.Users;

public class ChangeAdminPasswordRequestValidator : AbstractValidator<ChangeAdminPasswordRequest>
{
    public ChangeAdminPasswordRequestValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty();

        RuleFor(x => x.NewPassword)
            .NotEmpty()
            .MinimumLength(8)
            .MaximumLength(256);
    }
}
