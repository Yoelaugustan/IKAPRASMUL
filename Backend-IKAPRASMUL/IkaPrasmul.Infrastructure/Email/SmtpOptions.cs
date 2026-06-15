namespace IkaPrasmul.Infrastructure.Email;

/// <summary>SMTP connection settings (bound from the "Smtp" config section).
/// Host / Username / Password come from user-secrets, never appsettings.</summary>
public class SmtpOptions
{
    public const string SectionName = "Smtp";

    public string Host { get; set; } = string.Empty;
    public int Port { get; set; } = 587;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FromAddress { get; set; } = "no-reply@ikaprasmul.org";
    public string FromName { get; set; } = "IKAPRASMUL";

    /// <summary>STARTTLS on port 587 (true) vs implicit SSL on 465 (false).</summary>
    public bool UseStartTls { get; set; } = true;
}
