using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.Content;
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
    public async Task<IActionResult> Get(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetContentListRequest(ContentType.Event), ct));
}
