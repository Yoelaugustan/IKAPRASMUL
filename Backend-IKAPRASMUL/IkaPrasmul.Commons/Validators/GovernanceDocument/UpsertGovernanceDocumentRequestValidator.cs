using FluentValidation;
using IkaPrasmul.Contracts.RequestModels.GovernanceDocument;

namespace IkaPrasmul.Commons.Validators.GovernanceDocument;

public class UpsertGovernanceDocumentRequestValidator : AbstractValidator<UpsertGovernanceDocumentRequest>
{
    public UpsertGovernanceDocumentRequestValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Description).NotEmpty().MaximumLength(500);
        RuleFor(x => x.PdfUrl).NotEmpty().MaximumLength(500);
        RuleFor(x => x.SortOrder).GreaterThanOrEqualTo(0).When(x => x.SortOrder.HasValue);
    }
}
