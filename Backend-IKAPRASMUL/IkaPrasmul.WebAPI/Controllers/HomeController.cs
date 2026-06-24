using IkaPrasmul.Contracts.RequestModels.Public;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IkaPrasmul.WebAPI.Controllers;

[ApiController]
[Route("api/home")]
[AllowAnonymous]
public class HomeController : ControllerBase
{
    private readonly IMediator _mediator;

    public HomeController(IMediator mediator) => _mediator = mediator;

    [HttpGet("featured-alumni")]
    public async Task<IActionResult> FeaturedAlumni(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetFeaturedAlumniRequest(), ct));
}
