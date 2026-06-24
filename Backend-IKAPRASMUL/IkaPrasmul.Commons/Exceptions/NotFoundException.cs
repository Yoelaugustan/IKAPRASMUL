namespace IkaPrasmul.Commons.Exceptions;

/// <summary>Requested resource does not exist — maps to 404.</summary>
public class NotFoundException : Exception
{
    public NotFoundException(string message = "Not found") : base(message) { }
}
