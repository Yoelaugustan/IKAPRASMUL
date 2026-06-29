using IkaPrasmul.Contracts.RequestModels.Public;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IkaPrasmul.WebAPI.Controllers;

[ApiController]
[Route("api/events")]
[AllowAnonymous]
public class EventsController : ControllerBase
{
    private readonly IMediator _mediator;

    public EventsController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetEventsRequest request, CancellationToken ct) =>
        Ok(await _mediator.Send(request, ct));

    /// <summary>Returns YYYY-MM-DD strings for all published events in the given month.</summary>
    [HttpGet("dates")]
    public async Task<IActionResult> GetDates([FromQuery] GetEventDatesRequest request, CancellationToken ct) =>
        Ok(await _mediator.Send(request, ct));
}
