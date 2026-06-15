using IkaPrasmul.Commons.Services;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace IkaPrasmul.Infrastructure.Email;

/// <summary>SMTP implementation of <see cref="IEmailService"/> using MailKit.</summary>
public class SmtpEmailService : IEmailService
{
    private readonly SmtpOptions _options;

    public SmtpEmailService(IOptions<SmtpOptions> options)
    {
        _options = options.Value;
    }

    public async Task SendAsync(
        string toEmail,
        string subject,
        string htmlBody,
        string? replyTo = null,
        EmailAttachment? attachment = null,
        CancellationToken cancellationToken = default)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_options.FromName, _options.FromAddress));
        message.To.Add(MailboxAddress.Parse(toEmail));
        if (!string.IsNullOrWhiteSpace(replyTo))
        {
            message.ReplyTo.Add(MailboxAddress.Parse(replyTo));
        }
        message.Subject = subject;

        var bodyBuilder = new BodyBuilder { HtmlBody = htmlBody };
        if (attachment is not null)
        {
            bodyBuilder.Attachments.Add(
                attachment.FileName,
                attachment.Content,
                ContentType.Parse(attachment.ContentType));
        }
        message.Body = bodyBuilder.ToMessageBody();

        using var client = new SmtpClient();
        var socketOptions = _options.UseStartTls
            ? SecureSocketOptions.StartTls
            : SecureSocketOptions.SslOnConnect;

        await client.ConnectAsync(_options.Host, _options.Port, socketOptions, cancellationToken);
        if (!string.IsNullOrWhiteSpace(_options.Username))
        {
            await client.AuthenticateAsync(_options.Username, _options.Password, cancellationToken);
        }
        await client.SendAsync(message, cancellationToken);
        await client.DisconnectAsync(true, cancellationToken);
    }
}
