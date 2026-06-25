using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.News;

/// <summary>Increment the view counter for a published article. Fire-and-forget safe — never throws for unknown slugs.</summary>
public record IncrementArticleViewsRequest(string Slug) : IRequest<Unit>;
