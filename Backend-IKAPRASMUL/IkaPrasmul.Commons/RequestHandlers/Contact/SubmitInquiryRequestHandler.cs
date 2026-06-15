using System.Net;
using IkaPrasmul.Commons.Options;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.Contact;
using IkaPrasmul.Contracts.ResponseModels.Contact;
using IkaPrasmul.Entities;
using IkaPrasmul.Entities.Models;
using MediatR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace IkaPrasmul.Commons.RequestHandlers.Contact;

public class SubmitInquiryRequestHandler
    : IRequestHandler<SubmitInquiryRequest, SubmitInquiryResponse>
{
    private readonly ApplicationDbContext _db;
    private readonly IEmailService _email;
    private readonly ContactOptions _contact;
    private readonly ILogger<SubmitInquiryRequestHandler> _logger;

    public SubmitInquiryRequestHandler(
        ApplicationDbContext db,
        IEmailService email,
        IOptions<ContactOptions> contact,
        ILogger<SubmitInquiryRequestHandler> logger)
    {
        _db = db;
        _email = email;
        _contact = contact.Value;
        _logger = logger;
    }

    public async Task<SubmitInquiryResponse> Handle(
        SubmitInquiryRequest request,
        CancellationToken cancellationToken)
    {
        var inquiry = new ContactInquiry
        {
            Id = Guid.NewGuid(),
            FullName = request.FullName.Trim(),
            Email = request.Email.Trim(),
            Subject = request.Subject.Trim(),
            Message = request.Message.Trim(),
            CreatedAt = DateTime.UtcNow,
        };

        // 1) Persist first — the inquiry must survive even if the email fails.
        _db.ContactInquiries.Add(inquiry);
        await _db.SaveChangesAsync(cancellationToken);

        // Decode the optional image (returns null if absent or invalid).
        var attachment = TryBuildAttachment(request.Image, request.ImageName);

        // 2) Notify the admin. A mail failure is logged, not surfaced to the
        //    visitor — their message is already safely in the inbox.
        if (!string.IsNullOrWhiteSpace(_contact.AdminEmail))
        {
            try
            {
                await _email.SendAsync(
                    _contact.AdminEmail,
                    $"New inquiry: {inquiry.Subject}",
                    BuildBody(inquiry, attachment is not null),
                    replyTo: inquiry.Email,
                    attachment: attachment,
                    cancellationToken: cancellationToken);

                _logger.LogInformation(
                    "Sent contact notification for inquiry {InquiryId} to {AdminEmail}",
                    inquiry.Id, _contact.AdminEmail);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Failed to send contact notification email for inquiry {InquiryId}",
                    inquiry.Id);
            }
        }
        else
        {
            _logger.LogWarning(
                "Contact:AdminEmail is not configured — inquiry {InquiryId} stored without notification.",
                inquiry.Id);
        }

        return new SubmitInquiryResponse
        {
            Message = "Thank you — your message has been received. We'll be in touch soon.",
        };
    }

    private static string BuildBody(ContactInquiry inquiry, bool hasAttachment)
    {
        // Encode user-supplied values to avoid HTML injection in the email body.
        string E(string value) => WebUtility.HtmlEncode(value);

        var attachmentNote = hasAttachment
            ? "<p><em>📎 An image is attached to this email.</em></p>"
            : string.Empty;

        return $"""
            <h2>New "Get in Touch" inquiry</h2>
            <p><strong>Subject:</strong> {E(inquiry.Subject)}</p>
            <p><strong>From:</strong> {E(inquiry.FullName)} &lt;{E(inquiry.Email)}&gt;</p>
            <p><strong>Received:</strong> {inquiry.CreatedAt:yyyy-MM-dd HH:mm} UTC</p>
            <hr />
            <p style="white-space:pre-wrap">{E(inquiry.Message)}</p>
            {attachmentNote}
            """;
    }

    private static readonly string[] AllowedImageTypes =
        ["image/jpeg", "image/png", "image/webp"];

    private const int MaxAttachmentBytes = 5 * 1024 * 1024; // 5 MB

    /// <summary>
    /// Decodes a base64 data URL into a validated email attachment, or returns
    /// null if it's missing/malformed/disallowed. Validates the declared type,
    /// the decoded size, and the file signature (magic numbers) — never trusts
    /// the content-type alone (security-standard §8.1).
    /// </summary>
    private EmailAttachment? TryBuildAttachment(string? dataUrl, string? fileName)
    {
        if (string.IsNullOrWhiteSpace(dataUrl)) return null;

        const string prefix = "data:";
        var commaIndex = dataUrl.IndexOf(',');
        if (!dataUrl.StartsWith(prefix, StringComparison.Ordinal) || commaIndex < 0)
        {
            _logger.LogWarning("Discarded contact attachment: not a data URL.");
            return null;
        }

        var meta = dataUrl[prefix.Length..commaIndex]; // e.g. "image/png;base64"
        if (!meta.Contains("base64", StringComparison.OrdinalIgnoreCase))
        {
            return null;
        }

        var contentType = meta.Split(';')[0].Trim().ToLowerInvariant();
        if (Array.IndexOf(AllowedImageTypes, contentType) < 0)
        {
            _logger.LogWarning("Discarded contact attachment: type {Type} not allowed.", contentType);
            return null;
        }

        byte[] bytes;
        try
        {
            bytes = Convert.FromBase64String(dataUrl[(commaIndex + 1)..]);
        }
        catch (FormatException)
        {
            _logger.LogWarning("Discarded contact attachment: invalid base64.");
            return null;
        }

        if (bytes.Length == 0 || bytes.Length > MaxAttachmentBytes
            || !MagicNumberMatches(contentType, bytes))
        {
            _logger.LogWarning("Discarded contact attachment: size/signature check failed.");
            return null;
        }

        var safeName = string.IsNullOrWhiteSpace(fileName)
            ? $"attachment{ExtensionFor(contentType)}"
            : Path.GetFileName(fileName);

        return new EmailAttachment(safeName, bytes, contentType);
    }

    private static bool MagicNumberMatches(string contentType, byte[] b) => contentType switch
    {
        "image/jpeg" => b.Length >= 3 && b[0] == 0xFF && b[1] == 0xD8 && b[2] == 0xFF,
        "image/png" => b.Length >= 4 && b[0] == 0x89 && b[1] == 0x50 && b[2] == 0x4E && b[3] == 0x47,
        // "RIFF" .... "WEBP"
        "image/webp" => b.Length >= 12
            && b[0] == 0x52 && b[1] == 0x49 && b[2] == 0x46 && b[3] == 0x46
            && b[8] == 0x57 && b[9] == 0x45 && b[10] == 0x42 && b[11] == 0x50,
        _ => false,
    };

    private static string ExtensionFor(string contentType) => contentType switch
    {
        "image/jpeg" => ".jpg",
        "image/png" => ".png",
        "image/webp" => ".webp",
        _ => string.Empty,
    };
}
