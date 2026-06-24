using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.News;

/// <summary>Delete a News article by slug (Admin only). Idempotent.</summary>
public class DeleteArticleRequest : IRequest<Unit>
{
    public string Slug { get; set; } = string.Empty;

    public DeleteArticleRequest() { }
    public DeleteArticleRequest(string slug) => Slug = slug;
}
