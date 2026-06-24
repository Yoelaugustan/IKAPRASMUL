namespace IkaPrasmul.Entities.Interfaces;

/// <summary>Audit columns set by the admin CRUD handlers (be-standard §7).</summary>
public interface IHaveCreateAndUpdateAudit
{
    DateTime CreatedAt { get; set; }
    string? CreatedBy { get; set; }
    DateTime? UpdatedAt { get; set; }
    string? UpdatedBy { get; set; }
}
