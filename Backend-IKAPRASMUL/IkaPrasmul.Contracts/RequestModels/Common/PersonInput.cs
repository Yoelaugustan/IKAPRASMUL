namespace IkaPrasmul.Contracts.RequestModels.Common;

/// <summary>The nested author/founder object the frontend sends ({name, class, role?}).</summary>
public class PersonInput
{
    public string? Name { get; set; }
    public string? Class { get; set; }
    public string? Role { get; set; }
}
