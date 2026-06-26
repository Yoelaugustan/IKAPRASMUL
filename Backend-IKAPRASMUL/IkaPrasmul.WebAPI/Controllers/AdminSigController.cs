using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.Sig;
using IkaPrasmul.WebAPI.Filters;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace IkaPrasmul.WebAPI.Controllers;

/// <summary>Admin authoring for both SIG sub-tabs (groups + spotlight).</summary>
[Route("api/admin/sig")]
[RequiresSection(Sections.Sig)]
public class AdminSigController : AdminControllerBase
{
    private readonly IMediator _mediator;

    public AdminSigController(IMediator mediator) => _mediator = mediator;

    // ---- Groups ----
    [HttpGet("groups")]
    public async Task<IActionResult> Groups(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetAdminSigGroupListRequest(), ct));

    [HttpPost("groups")]
    public async Task<IActionResult> UpsertGroup([FromBody] UpsertSigGroupRequest request, CancellationToken ct)
    {
        request.Actor = ActorEmail;
        return Ok(await _mediator.Send(request, ct));
    }

    [HttpDelete("groups/{key}")]
    public async Task<IActionResult> DeleteGroup(string key, CancellationToken ct)
    {
        await _mediator.Send(new DeleteSigGroupRequest(key), ct);
        return NoContent();
    }

    // ---- Spotlight ----
    [HttpGet("spotlight")]
    public async Task<IActionResult> Spotlights(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetAdminSigSpotlightListRequest(), ct));

    [HttpPost("spotlight")]
    public async Task<IActionResult> UpsertSpotlight([FromBody] UpsertSigSpotlightRequest request, CancellationToken ct)
    {
        request.Actor = ActorEmail;
        return Ok(await _mediator.Send(request, ct));
    }

    [HttpDelete("spotlight/{key}")]
    public async Task<IActionResult> DeleteSpotlight(string key, CancellationToken ct)
    {
        await _mediator.Send(new DeleteSigSpotlightRequest(key), ct);
        return NoContent();
    }
}
