namespace IkaPrasmul.Commons.Options;

/// <summary>Where Contact inquiry notifications are sent.</summary>
public class ContactOptions
{
    public const string SectionName = "Contact";

    /// <summary>Admin mailbox that receives "new inquiry" notifications.</summary>
    public string AdminEmail { get; set; } = string.Empty;
}
