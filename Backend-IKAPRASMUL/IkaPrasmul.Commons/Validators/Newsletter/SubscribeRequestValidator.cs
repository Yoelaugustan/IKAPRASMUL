using FluentValidation;
using IkaPrasmul.Contracts.RequestModels.Newsletter;

namespace IkaPrasmul.Commons.Validators.Newsletter;

public class SubscribeRequestValidator : AbstractValidator<SubscribeRequest>
{
    public SubscribeRequestValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(255);

        RuleFor(x => x.Source)
            .MaximumLength(40);
    }
}
