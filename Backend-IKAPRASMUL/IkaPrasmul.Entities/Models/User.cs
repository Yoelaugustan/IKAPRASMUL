using Microsoft.AspNetCore.Identity;

namespace IkaPrasmul.Entities.Models;

/// <summary>
/// An administrator account. There is no public sign-up — admin users are
/// seeded/provisioned (be-standard §6.1). Extends <see cref="IdentityUser{TKey}"/>
/// with a Guid key (non-enumerable, security-standard §3.2).
/// </summary>
public class User : IdentityUser<Guid>
{
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
