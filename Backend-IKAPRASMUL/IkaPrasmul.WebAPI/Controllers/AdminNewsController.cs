using IkaPrasmul.Contracts.RequestModels.News;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace IkaPrasmul.WebAPI.Controllers;

[Route("api/admin/news")]
public class AdminNewsController : AdminControllerBase
{
    private readonly IMediator _mediator;

    public AdminNewsController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> List(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetAdminArticleListRequest(), ct));

    [HttpPost]
    public async Task<IActionResult> Upsert([FromBody] UpsertArticleRequest request, CancellationToken ct)
    {
        request.Actor = ActorEmail;
        return Ok(await _mediator.Send(request, ct));
    }

    [HttpDelete("{slug}")]
    public async Task<IActionResult> Delete(string slug, CancellationToken ct)
    {
        await _mediator.Send(new DeleteArticleRequest(slug), ct);
        return NoContent();
    }
}
