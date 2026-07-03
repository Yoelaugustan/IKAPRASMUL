using IkaPrasmul.Contracts.RequestModels.Newsletter;
using IkaPrasmul.Contracts.ResponseModels.Newsletter;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace IkaPrasmul.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]
[EnableRateLimiting(Program.PublicWritePolicy)]
public class NewsletterController : ControllerBase
{
    private readonly IMediator _mediator;

    public NewsletterController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("subscribe")]
    public async Task<ActionResult<SubscribeResponse>> Subscribe(
        [FromBody] SubscribeRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }

    // GET so the link in the newsletter email works as a plain <a href>.
    [HttpGet("unsubscribe")]
    public async Task<ActionResult<SubscribeResponse>> Unsubscribe(
        [FromQuery] string email,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new UnsubscribeRequest { Email = email }, cancellationToken);
        return Ok(result);
    }
}
