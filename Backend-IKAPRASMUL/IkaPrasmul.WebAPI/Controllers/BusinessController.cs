using IkaPrasmul.Contracts.RequestModels.Public;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IkaPrasmul.WebAPI.Controllers;

[ApiController]
[Route("api/business")]
[AllowAnonymous]
public class BusinessController : ControllerBase
{
    private readonly IMediator _mediator;

    public BusinessController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetBusinessesRequest request, CancellationToken ct) =>
        Ok(await _mediator.Send(request, ct));
}
