using IkaPrasmul.Contracts.ResponseModels.Users;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Users;

public record GetAdminUsersRequest : IRequest<List<AdminUserDto>>;
