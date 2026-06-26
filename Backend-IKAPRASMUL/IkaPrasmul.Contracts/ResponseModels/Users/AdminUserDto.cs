namespace IkaPrasmul.Contracts.ResponseModels.Users;

/// <summary>Represents an admin user as returned by the user management API.</summary>
public record AdminUserDto(
    Guid Id,
    string Email,
    string Role,
    IReadOnlyList<string> Permissions,
    DateTime CreatedAt
);
