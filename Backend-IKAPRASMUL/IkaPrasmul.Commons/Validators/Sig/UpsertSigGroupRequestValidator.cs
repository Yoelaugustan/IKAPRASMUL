using FluentValidation;
using IkaPrasmul.Contracts.RequestModels.Sig;

namespace IkaPrasmul.Commons.Validators.Sig;

public class UpsertSigGroupRequestValidator : AbstractValidator<UpsertSigGroupRequest>
{
    public UpsertSigGroupRequestValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Id).MaximumLength(80);
        RuleFor(x => x.Image).MaximumLength(500);
        RuleFor(x => x.Icon).MaximumLength(80);
    }
}
