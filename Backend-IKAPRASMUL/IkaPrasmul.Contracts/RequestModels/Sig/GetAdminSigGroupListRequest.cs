using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Sig;

/// <summary>Admin SIG group list (Admin only).</summary>
public class GetAdminSigGroupListRequest : IRequest<List<JsonElement>>
{
}
