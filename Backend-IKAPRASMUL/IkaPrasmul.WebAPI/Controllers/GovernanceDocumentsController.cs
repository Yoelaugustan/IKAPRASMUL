using IkaPrasmul.Contracts.RequestModels.Public;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IkaPrasmul.WebAPI.Controllers;

[ApiController]
[Route("api/governance-documents")]
[AllowAnonymous]
public class GovernanceDocumentsController : ControllerBase
{
    private readonly IMediator _mediator;

    public GovernanceDocumentsController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetGovernanceDocumentsRequest(), ct));
}
