using IkaPrasmul.Contracts.RequestModels.Event;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace IkaPrasmul.WebAPI.Controllers;

[Route("api/admin/events")]
public class AdminEventsController : AdminControllerBase
{
    private readonly IMediator _mediator;

    public AdminEventsController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> List(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetAdminEventListRequest(), ct));

    [HttpPost]
    public async Task<IActionResult> Upsert([FromBody] UpsertEventRequest request, CancellationToken ct)
    {
        request.Actor = ActorEmail;
        return Ok(await _mediator.Send(request, ct));
    }

    [HttpDelete("{slug}")]
    public async Task<IActionResult> Delete(string slug, CancellationToken ct)
    {
        await _mediator.Send(new DeleteEventRequest(slug), ct);
        return NoContent();
    }
}
