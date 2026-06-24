using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Public;

/// <summary>Public: the home page's "Alumni of the Month", derived from the
/// published story flagged <c>isFeaturedHome</c>. Null if none.</summary>
public class GetFeaturedAlumniRequest : IRequest<JsonElement?>
{
}
