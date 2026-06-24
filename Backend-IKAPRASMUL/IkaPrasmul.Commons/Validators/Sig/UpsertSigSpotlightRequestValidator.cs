using FluentValidation;
using IkaPrasmul.Contracts.RequestModels.Sig;

namespace IkaPrasmul.Commons.Validators.Sig;

public class UpsertSigSpotlightRequestValidator : AbstractValidator<UpsertSigSpotlightRequest>
{
    public UpsertSigSpotlightRequestValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Id).MaximumLength(80);
        RuleFor(x => x.Image).MaximumLength(500);
    }
}
