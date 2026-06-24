using IkaPrasmul.Contracts.RequestModels.Public;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IkaPrasmul.WebAPI.Controllers;

[ApiController]
[Route("api/sig")]
[AllowAnonymous]
public class SigController : ControllerBase
{
    private readonly IMediator _mediator;

    public SigController(IMediator mediator) => _mediator = mediator;

    [HttpGet("groups")]
    public async Task<IActionResult> Groups(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetSigGroupsRequest(), ct));

    [HttpGet("spotlight")]
    public async Task<IActionResult> Spotlight(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetSigSpotlightsRequest(), ct));
}
