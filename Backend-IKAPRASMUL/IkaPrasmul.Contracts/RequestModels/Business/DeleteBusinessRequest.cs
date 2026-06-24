using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Business;

/// <summary>Delete an Alumni Business by slug (Admin only). Idempotent.</summary>
public class DeleteBusinessRequest : IRequest<Unit>
{
    public string Slug { get; set; } = string.Empty;

    public DeleteBusinessRequest() { }
    public DeleteBusinessRequest(string slug) => Slug = slug;
}
