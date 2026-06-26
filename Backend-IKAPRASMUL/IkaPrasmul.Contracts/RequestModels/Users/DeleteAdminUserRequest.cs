using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Users;

public record DeleteAdminUserRequest(Guid UserId) : IRequest<Unit>;
