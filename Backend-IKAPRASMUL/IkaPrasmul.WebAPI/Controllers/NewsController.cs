using IkaPrasmul.Contracts.RequestModels.News;
using IkaPrasmul.Contracts.RequestModels.Public;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IkaPrasmul.WebAPI.Controllers;

[ApiController]
[Route("api/news")]
[AllowAnonymous]
public class NewsController : ControllerBase
{
    private readonly IMediator _mediator;

    public NewsController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetNewsRequest request, CancellationToken ct) =>
        Ok(await _mediator.Send(request, ct));

    [HttpPost("{slug}/view")]
    public async Task<IActionResult> IncrementView(string slug, CancellationToken ct)
    {
        await _mediator.Send(new IncrementNewsViewsRequest(slug), ct);
        return NoContent();
    }
}
