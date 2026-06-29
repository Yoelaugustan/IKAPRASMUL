using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.News;
using IkaPrasmul.WebAPI.Filters;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace IkaPrasmul.WebAPI.Controllers;

[Route("api/admin/news")]
[RequiresSection(Sections.News)]
public class AdminNewsController : AdminControllerBase
{
    private readonly IMediator _mediator;

    public AdminNewsController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> List([FromQuery] GetAdminNewsListRequest request, CancellationToken ct) =>
        Ok(await _mediator.Send(request, ct));

    [HttpPost]
    public async Task<IActionResult> Upsert([FromBody] UpsertNewsRequest request, CancellationToken ct)
    {
        request.Actor = ActorEmail;
        return Ok(await _mediator.Send(request, ct));
    }

    [HttpDelete("{slug}")]
    public async Task<IActionResult> Delete(string slug, CancellationToken ct)
    {
        await _mediator.Send(new DeleteNewsRequest(slug), ct);
        return NoContent();
    }
}
