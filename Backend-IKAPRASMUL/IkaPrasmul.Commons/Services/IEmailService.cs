namespace IkaPrasmul.Commons.Services;

/// <summary>A file to attach to an email.</summary>
public record EmailAttachment(string FileName, byte[] Content, string ContentType);

/// <summary>Sends transactional email. Implemented in the Infrastructure layer (SMTP).</summary>
public interface IEmailService
{
    Task SendAsync(
        string toEmail,
        string subject,
        string htmlBody,
        string? replyTo = null,
        EmailAttachment? attachment = null,
        CancellationToken cancellationToken = default);
}
