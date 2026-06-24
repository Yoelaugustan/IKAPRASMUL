using FluentValidation;
using IkaPrasmul.Contracts.RequestModels.Auth;

namespace IkaPrasmul.Commons.Validators.Auth;

public class RefreshTokenRequestValidator : AbstractValidator<RefreshTokenRequest>
{
    public RefreshTokenRequestValidator()
    {
        RuleFor(x => x.RefreshToken).NotEmpty().MaximumLength(200);
    }
}
