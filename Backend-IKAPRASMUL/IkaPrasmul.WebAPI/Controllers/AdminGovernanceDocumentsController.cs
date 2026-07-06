using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.GovernanceDocument;
using IkaPrasmul.WebAPI.Filters;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace IkaPrasmul.WebAPI.Controllers;

[Route("api/admin/governance-documents")]
[RequiresSection(Sections.Governance)]
public class AdminGovernanceDocumentsController : AdminControllerBase
{
    private readonly IMediator _mediator;

    public AdminGovernanceDocumentsController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> List([FromQuery] GetAdminGovernanceDocumentListRequest request, CancellationToken ct) =>
        Ok(await _mediator.Send(request, ct));

    [HttpPost]
    public async Task<IActionResult> Upsert([FromBody] UpsertGovernanceDocumentRequest request, CancellationToken ct)
    {
        request.Actor = ActorEmail;
        return Ok(await _mediator.Send(request, ct));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id, CancellationToken ct)
    {
        await _mediator.Send(new DeleteGovernanceDocumentRequest(id), ct);
        return NoContent();
    }
}
