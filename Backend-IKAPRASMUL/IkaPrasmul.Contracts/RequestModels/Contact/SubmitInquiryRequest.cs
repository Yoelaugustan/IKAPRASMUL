using IkaPrasmul.Contracts.ResponseModels.Contact;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Contact;

/// <summary>"Get in Touch" form submission (public).</summary>
public class SubmitInquiryRequest : IRequest<SubmitInquiryResponse>
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;

    /// <summary>Optional attachment as a base64 data URL (e.g. "data:image/png;base64,...").</summary>
    public string? Image { get; set; }

    /// <summary>Original file name of the attachment, for the email.</summary>
    public string? ImageName { get; set; }
}
