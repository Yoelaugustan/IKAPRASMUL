using FluentValidation;
using IkaPrasmul.Contracts.RequestModels.Auth;

namespace IkaPrasmul.Commons.Validators.Auth;

public class ForgotPasswordRequestValidator : AbstractValidator<ForgotPasswordRequest>
{
    public ForgotPasswordRequestValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(254);
    }
}
