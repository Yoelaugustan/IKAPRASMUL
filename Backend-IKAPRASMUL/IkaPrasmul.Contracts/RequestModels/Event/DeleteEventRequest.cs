using MediatR;

namespace IkaPrasmul.Contracts.RequestModels.Event;

/// <summary>Delete an Event by slug (Admin only). Idempotent.</summary>
public class DeleteEventRequest : IRequest<Unit>
{
    public string Slug { get; set; } = string.Empty;

    public DeleteEventRequest() { }
    public DeleteEventRequest(string slug) => Slug = slug;
}
