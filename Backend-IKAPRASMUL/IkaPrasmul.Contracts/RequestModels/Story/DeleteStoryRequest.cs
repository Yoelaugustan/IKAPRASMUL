using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Story;

/// <summary>Delete an Alumni Story by slug (Admin only). Idempotent.</summary>
public class DeleteStoryRequest : IRequest<Unit>
{
    public string Slug { get; set; } = string.Empty;

    public DeleteStoryRequest() { }
    public DeleteStoryRequest(string slug) => Slug = slug;
}
