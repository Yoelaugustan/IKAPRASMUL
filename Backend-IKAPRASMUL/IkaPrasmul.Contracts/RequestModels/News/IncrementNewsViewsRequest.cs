using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.News;

/// <summary>Increment the view counter for a published news item. Fire-and-forget safe — never throws for unknown slugs.</summary>
public record IncrementNewsViewsRequest(string Slug) : IRequest<Unit>;
