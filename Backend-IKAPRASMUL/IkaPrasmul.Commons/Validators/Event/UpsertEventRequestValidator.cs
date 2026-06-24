using FluentValidation;
using IkaPrasmul.Contracts.RequestModels.Event;

namespace IkaPrasmul.Commons.Validators.Event;

public class UpsertEventRequestValidator : AbstractValidator<UpsertEventRequest>
{
    public UpsertEventRequestValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(220);
        RuleFor(x => x.Slug).MaximumLength(220);
        RuleFor(x => x.Date).MaximumLength(40);
        RuleFor(x => x.Location).MaximumLength(300);
        RuleFor(x => x.CoverImage).MaximumLength(500);
        RuleFor(x => x.RegisterUrl).MaximumLength(255);
    }
}
