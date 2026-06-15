using FluentValidation;
using IkaPrasmul.Contracts.RequestModels.Contact;

namespace IkaPrasmul.Commons.Validators.Contact;

public class SubmitInquiryRequestValidator : AbstractValidator<SubmitInquiryRequest>
{
    public SubmitInquiryRequestValidator()
    {
        RuleFor(x => x.FullName)
            .NotEmpty()
            .MaximumLength(150);

        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(255);

        RuleFor(x => x.Subject)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.Message)
            .NotEmpty()
            .MaximumLength(4000);

        // Optional attachment — a base64 image data URL. Decoded + fully
        // validated (type/size/signature) in the handler; this is a cheap guard.
        RuleFor(x => x.Image)
            .MaximumLength(7_000_000)
            .Must(img => string.IsNullOrEmpty(img)
                || img.StartsWith("data:image/", StringComparison.OrdinalIgnoreCase))
            .WithMessage("Attachment must be an image.");

        RuleFor(x => x.ImageName)
            .MaximumLength(255);
    }
}
