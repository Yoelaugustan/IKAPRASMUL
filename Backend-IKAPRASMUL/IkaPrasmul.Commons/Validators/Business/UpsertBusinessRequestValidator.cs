using FluentValidation;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.Business;

namespace IkaPrasmul.Commons.Validators.Business;

public class UpsertBusinessRequestValidator : AbstractValidator<UpsertBusinessRequest>
{
    public UpsertBusinessRequestValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(180);
        RuleFor(x => x.Slug).MaximumLength(180);
        RuleFor(x => x.Industry)
            .NotEmpty()
            .Must(i => ContentCategories.Industries.Contains(i))
            .WithMessage("Unknown industry.");
        RuleFor(x => x.Location).MaximumLength(200);
        RuleFor(x => x.ShortDescription).MaximumLength(600);
        RuleFor(x => x.Logo).MaximumLength(500);
        RuleFor(x => x.CoverImage).MaximumLength(500);
        RuleFor(x => x.Website).MaximumLength(255);
        RuleFor(x => x.Founder!.Name).MaximumLength(150).When(x => x.Founder is not null);
        RuleFor(x => x.Founder!.Class).MaximumLength(60).When(x => x.Founder is not null);
    }
}
