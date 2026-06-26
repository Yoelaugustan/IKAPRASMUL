using FluentValidation;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.Users;

namespace IkaPrasmul.Commons.Validators.Users;

public class UpdateAdminPermissionsRequestValidator : AbstractValidator<UpdateAdminPermissionsRequest>
{
    public UpdateAdminPermissionsRequestValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty();

        RuleFor(x => x.Permissions)
            .NotNull()
            .Must(perms => perms.All(p => Sections.All.Contains(p)))
            .WithMessage($"Permissions must be valid section keys: {string.Join(", ", Sections.All)}.");
    }
}
