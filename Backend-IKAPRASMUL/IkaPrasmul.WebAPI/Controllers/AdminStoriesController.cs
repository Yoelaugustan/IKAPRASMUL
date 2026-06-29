using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.Story;
using IkaPrasmul.WebAPI.Filters;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace IkaPrasmul.WebAPI.Controllers;

[Route("api/admin/stories")]
[RequiresSection(Sections.Stories)]
public class AdminStoriesController : AdminControllerBase
{
    private readonly IMediator _mediator;

    public AdminStoriesController(IMediator mediator) => _mediator = mediator;

    /// <summary>List all stories including drafts.</summary>
    [HttpGet]
    public async Task<IActionResult> List([FromQuery] GetAdminStoryListRequest request, CancellationToken ct) =>
        Ok(await _mediator.Send(request, ct));

    /// <summary>Create or update a story.</summary>
    [HttpPost]
    public async Task<IActionResult> Upsert([FromBody] UpsertStoryRequest request, CancellationToken ct)
    {
        request.Actor = ActorEmail;
        return Ok(await _mediator.Send(request, ct));
    }

    [HttpDelete("{slug}")]
    public async Task<IActionResult> Delete(string slug, CancellationToken ct)
    {
        await _mediator.Send(new DeleteStoryRequest(slug), ct);
        return NoContent();
    }
}
