using FluentValidation;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.Users;

namespace IkaPrasmul.Commons.Validators.Users;

public class CreateAdminUserRequestValidator : AbstractValidator<CreateAdminUserRequest>
{
    public CreateAdminUserRequestValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(254);

        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(8)
            .MaximumLength(256);

        RuleFor(x => x.Permissions)
            .NotNull()
            .Must(perms => perms.All(p => Sections.All.Contains(p)))
            .WithMessage($"Permissions must be valid section keys: {string.Join(", ", Sections.All)}.");
    }
}
