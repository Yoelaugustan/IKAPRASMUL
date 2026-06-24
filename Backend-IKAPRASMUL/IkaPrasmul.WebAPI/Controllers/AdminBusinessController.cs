using IkaPrasmul.Contracts.RequestModels.Business;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace IkaPrasmul.WebAPI.Controllers;

[Route("api/admin/business")]
public class AdminBusinessController : AdminControllerBase
{
    private readonly IMediator _mediator;

    public AdminBusinessController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> List(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetAdminBusinessListRequest(), ct));

    [HttpPost]
    public async Task<IActionResult> Upsert([FromBody] UpsertBusinessRequest request, CancellationToken ct)
    {
        request.Actor = ActorEmail;
        return Ok(await _mediator.Send(request, ct));
    }

    [HttpDelete("{slug}")]
    public async Task<IActionResult> Delete(string slug, CancellationToken ct)
    {
        await _mediator.Send(new DeleteBusinessRequest(slug), ct);
        return NoContent();
    }
}
