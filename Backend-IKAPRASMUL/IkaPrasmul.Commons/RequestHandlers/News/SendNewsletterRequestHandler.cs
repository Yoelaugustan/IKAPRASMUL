using System.Net;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Exceptions;
using IkaPrasmul.Commons.Options;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Contracts.RequestModels.News;
using IkaPrasmul.Contracts.ResponseModels.News;
using IkaPrasmul.Entities;
using NewsEntity = IkaPrasmul.Entities.Models.News;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace IkaPrasmul.Commons.RequestHandlers.News;

/// <summary>
/// Emails every active newsletter subscriber about a Newsletter-type News item.
/// Explicit admin action (confirmed in the UI) rather than automatic on publish.
/// Each send is isolated in its own try/catch so one bad address can't stop the
/// rest of the list.
/// </summary>
public class SendNewsletterRequestHandler : IRequestHandler<SendNewsletterRequest, SendNewsletterResponse>
{
    private readonly ApplicationDbContext _db;
    private readonly IEmailService _email;
    private readonly AppUrlsOptions _urls;
    private readonly ILogger<SendNewsletterRequestHandler> _logger;

    public SendNewsletterRequestHandler(
        ApplicationDbContext db,
        IEmailService email,
        IOptions<AppUrlsOptions> urls,
        ILogger<SendNewsletterRequestHandler> logger)
    {
        _db = db;
        _email = email;
        _urls = urls.Value;
        _logger = logger;
    }

    public async Task<SendNewsletterResponse> Handle(SendNewsletterRequest request, CancellationToken ct)
    {
        var entity = await _db.News.FirstOrDefaultAsync(a => a.Slug == request.Slug, ct)
            ?? throw new NotFoundException("News item not found.");

        if (!string.Equals(entity.Type, "newsletter", StringComparison.OrdinalIgnoreCase))
            throw new BusinessRuleException("Only Newsletter-type news items can be sent to subscribers.");

        if (entity.Status != ContentStatus.Published)
            throw new BusinessRuleException("Publish this newsletter before sending it to subscribers.");

        var subscribers = await _db.NewsletterSubscriptions
            .Where(s => s.IsActive)
            .Select(s => s.Email)
            .ToListAsync(ct);

        if (subscribers.Count == 0)
        {
            return new SendNewsletterResponse
            {
                SentCount = 0,
                SubscriberCount = 0,
                Message = "There are no active newsletter subscribers yet.",
            };
        }

        var pdfLink = string.IsNullOrWhiteSpace(entity.PdfUrl)
            ? _urls.Frontend
            : $"{_urls.Frontend.TrimEnd('/')}{entity.PdfUrl}";
        var subject = $"Newsletter Baru: {entity.Title}";

        var sentCount = 0;
        foreach (var toEmail in subscribers)
        {
            try
            {
                await _email.SendAsync(
                    toEmail,
                    subject,
                    BuildNotificationBody(entity, pdfLink, toEmail),
                    cancellationToken: ct);
                sentCount++;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Failed to send newsletter {NewsId} to {Email}",
                    entity.Id, toEmail);
            }
        }

        _logger.LogInformation(
            "Sent newsletter {NewsId} to {Sent}/{Total} subscriber(s)",
            entity.Id, sentCount, subscribers.Count);

        return new SendNewsletterResponse
        {
            SentCount = sentCount,
            SubscriberCount = subscribers.Count,
            Message = $"Sent to {sentCount} of {subscribers.Count} subscriber(s).",
        };
    }

    /// <summary>
    /// Branded HTML notification email — table-based layout with inline styles
    /// throughout (not a &lt;style&gt; block), since that's what survives across
    /// email clients like Outlook. Mirrors the site's navy/gold identity.
    /// </summary>
    private string BuildNotificationBody(NewsEntity entity, string pdfLink, string toEmail)
    {
        string E(string? value) => WebUtility.HtmlEncode(value ?? string.Empty);

        var frontendUrl = _urls.Frontend.TrimEnd('/');
        // Points at the frontend confirmation page (not the raw API endpoint
        // directly) so the recipient sees a branded page, not bare JSON.
        var unsubscribeLink = $"{frontendUrl}/unsubscribe?email={Uri.EscapeDataString(toEmail)}";

        var metaParts = new List<string>();
        if (!string.IsNullOrWhiteSpace(entity.Category)) metaParts.Add(E(entity.Category));
        if (!string.IsNullOrWhiteSpace(entity.AuthorName)) metaParts.Add($"Oleh {E(entity.AuthorName)}");
        if (!string.IsNullOrWhiteSpace(entity.PublishedAt)) metaParts.Add(E(entity.PublishedAt));
        if (entity.ReadMinutes > 0) metaParts.Add($"{entity.ReadMinutes} menit baca");

        var metaRow = metaParts.Count == 0
            ? string.Empty
            : $"""<div style="margin:0 0 20px;color:#6b7280;font-size:13px;">{string.Join("&nbsp;&nbsp;•&nbsp;&nbsp;", metaParts)}</div>""";

        var excerptRow = string.IsNullOrWhiteSpace(entity.Excerpt)
            ? string.Empty
            : $"""<p style="margin:0 0 28px;color:#374151;font-size:15px;line-height:1.7;">{E(entity.Excerpt)}</p>""";

        return $"""
            <!doctype html>
            <html>
            <body style="margin:0;padding:0;background-color:#f5f7fa;font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f7fa;padding:32px 16px;">
                <tr>
                  <td align="center">
                    <table role="presentation" width="600" cellpadding="0" cellspacing="0"
                           style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;">
                      <tr>
                        <td style="background-color:#00396c;padding:28px 32px;border-top:4px solid #c6b273;">
                          <span style="color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:0.5px;">IKAPRASMUL</span>
                          <div style="color:#c6b273;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1.5px;margin-top:6px;">
                            Newsletter Baru
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:32px;">
                          <h1 style="margin:0 0 10px;color:#0a192f;font-size:24px;line-height:1.35;">{E(entity.Title)}</h1>
                          {metaRow}
                          {excerptRow}
                          <table role="presentation" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="border-radius:8px;background-color:#00396c;">
                                <a href="{pdfLink}"
                                   style="display:inline-block;padding:14px 28px;color:#c6b273;font-size:14px;font-weight:bold;text-decoration:none;border-radius:8px;">
                                  Baca Newsletter Selengkapnya &rarr;
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="border-top:1px solid #e5e7eb;font-size:0;line-height:0;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td style="padding:24px 32px;background-color:#f9fafb;">
                          <p style="margin:0 0 10px;color:#9ca3af;font-size:12px;line-height:1.6;">
                            Anda menerima email ini karena terdaftar sebagai pelanggan newsletter
                            Ikatan Alumni Prasetiya Mulya (IKAPRASMUL).
                          </p>
                          <p style="margin:0;color:#9ca3af;font-size:12px;">
                            <a href="{frontendUrl}" style="color:#00396c;text-decoration:none;">Kunjungi Website</a>
                            &nbsp;&middot;&nbsp;
                            <a href="{unsubscribeLink}" style="color:#00396c;text-decoration:none;">Berhenti Berlangganan</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            """;
    }
}
