using FluentValidation;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.Story;

namespace IkaPrasmul.Commons.Validators.Story;

public class UpsertStoryRequestValidator : AbstractValidator<UpsertStoryRequest>
{
    public UpsertStoryRequestValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Slug).MaximumLength(220);
        RuleFor(x => x.Excerpt).MaximumLength(600);
        RuleFor(x => x.Category)
            .NotEmpty()
            .Must(c => ContentCategories.Story.Contains(c))
            .WithMessage("Unknown story category.");
        RuleFor(x => x.CoverImage).MaximumLength(500);
        RuleFor(x => x.PublishedAt).MaximumLength(40);
        RuleFor(x => x.ReadMinutes).InclusiveBetween(0, 600);
        RuleFor(x => x.Author!.Name).MaximumLength(150).When(x => x.Author is not null);
        RuleFor(x => x.Author!.Class).MaximumLength(60).When(x => x.Author is not null);
        RuleFor(x => x.Author!.Role).MaximumLength(200).When(x => x.Author is not null);
    }
}
