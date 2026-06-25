namespace IkaPrasmul.Commons.Exceptions;

/// <summary>A business rule was violated (e.g. exceeding a slot limit). Maps to 422.</summary>
public class BusinessRuleException : Exception
{
    public BusinessRuleException(string message) : base(message) { }
}
