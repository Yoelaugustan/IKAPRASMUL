using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.News;

/// <summary>Delete a News item by slug (Admin only). Idempotent.</summary>
public class DeleteNewsRequest : IRequest<Unit>
{
    public string Slug { get; set; } = string.Empty;

    public DeleteNewsRequest() { }
    public DeleteNewsRequest(string slug) => Slug = slug;
}
