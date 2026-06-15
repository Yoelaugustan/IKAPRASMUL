using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Content;

/// <summary>Returns all published items of a content type, in order, as raw JSON.</summary>
public class GetContentListRequest : IRequest<List<JsonElement>>
{
    public string Type { get; set; } = string.Empty;

    public GetContentListRequest()
    {
    }

    public GetContentListRequest(string type) => Type = type;
}
