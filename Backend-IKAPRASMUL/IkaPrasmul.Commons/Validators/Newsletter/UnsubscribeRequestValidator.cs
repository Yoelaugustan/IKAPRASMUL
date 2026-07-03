using FluentValidation;
using IkaPrasmul.Contracts.RequestModels.Newsletter;

namespace IkaPrasmul.Commons.Validators.Newsletter;

public class UnsubscribeRequestValidator : AbstractValidator<UnsubscribeRequest>
{
    public UnsubscribeRequestValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(255);
    }
}
