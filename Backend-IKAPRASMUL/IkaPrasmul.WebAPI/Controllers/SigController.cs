using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.Content;
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

    /// <summary>The "Our Shared Interest Groups" grid (image + name).</summary>
    [HttpGet("groups")]
    public async Task<IActionResult> Groups(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetContentListRequest(ContentType.SigGroup), ct));

    /// <summary>The (news-like) SIG Spotlight feature — a separate data source.</summary>
    [HttpGet("spotlight")]
    public async Task<IActionResult> Spotlight(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetContentListRequest(ContentType.SigSpotlight), ct));
}
