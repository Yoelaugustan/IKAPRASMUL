namespace IkaPrasmul.Commons.Exceptions;

/// <summary>Authentication failed — maps to 401. The message is intentionally
/// generic to avoid account enumeration (security-standard §2.2).</summary>
public class UnauthorizedException : Exception
{
    public UnauthorizedException(string message = "Unauthorized") : base(message) { }
}
