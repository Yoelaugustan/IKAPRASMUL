namespace IkaPrasmul.Commons.Constants;

/// <summary>
/// Application roles. A Viewer is anonymous/unauthenticated — only Admin is a
/// real authenticated role (be-standard §6.3). There is no public sign-up.
/// </summary>
public static class Roles
{
    public const string Admin = "Admin";
    public const string SuperAdmin = "SuperAdmin";
}
