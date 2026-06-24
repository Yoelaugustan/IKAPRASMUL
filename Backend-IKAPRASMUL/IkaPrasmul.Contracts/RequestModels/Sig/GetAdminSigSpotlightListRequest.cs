using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Sig;

/// <summary>Admin SIG spotlight list — includes drafts (Admin only).</summary>
public class GetAdminSigSpotlightListRequest : IRequest<List<JsonElement>>
{
}
