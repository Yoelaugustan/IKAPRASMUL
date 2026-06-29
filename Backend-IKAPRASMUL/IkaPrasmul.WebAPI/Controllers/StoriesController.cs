using IkaPrasmul.Contracts.RequestModels.Public;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IkaPrasmul.WebAPI.Controllers;

[ApiController]
[Route("api/stories")]
[AllowAnonymous]
public class StoriesController : ControllerBase
{
    private readonly IMediator _mediator;

    public StoriesController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetStoriesRequest request, CancellationToken ct) =>
        Ok(await _mediator.Send(request, ct));
}
