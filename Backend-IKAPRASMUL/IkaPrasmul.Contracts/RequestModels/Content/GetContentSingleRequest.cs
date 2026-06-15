using System.Text.Json;
using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Content;

/// <summary>Returns the first published item of a content type as raw JSON (e.g.
/// the About blob or the featured alumnus), or null if none.</summary>
public class GetContentSingleRequest : IRequest<JsonElement?>
{
    public string Type { get; set; } = string.Empty;

    public GetContentSingleRequest()
    {
    }

    public GetContentSingleRequest(string type) => Type = type;
}
