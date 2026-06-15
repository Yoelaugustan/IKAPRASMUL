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

    /// <summary>Subscribe an email to the newsletter list.</summary>
    [HttpPost("subscribe")]
    public async Task<ActionResult<SubscribeResponse>> Subscribe(
        [FromBody] SubscribeRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }
}
