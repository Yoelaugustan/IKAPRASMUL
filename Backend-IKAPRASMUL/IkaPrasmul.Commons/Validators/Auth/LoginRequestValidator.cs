using FluentValidation;
using IkaPrasmul.Contracts.RequestModels.Auth;

namespace IkaPrasmul.Commons.Validators.Auth;

public class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(254);
        // Min length only — never reveal policy specifics on the login path.
        RuleFor(x => x.Password).NotEmpty().MaximumLength(256);
    }
}
