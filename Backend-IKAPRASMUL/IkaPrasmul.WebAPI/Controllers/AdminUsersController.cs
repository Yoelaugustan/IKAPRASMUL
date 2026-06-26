using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.Users;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IkaPrasmul.WebAPI.Controllers;

/// <summary>User management for the SuperAdmin — list is accessible to all Admins,
/// write operations are restricted to SuperAdmin only.</summary>
[Route("api/admin/users")]
public class AdminUsersController : AdminControllerBase
{
    private readonly IMediator _mediator;

    public AdminUsersController(IMediator mediator) => _mediator = mediator;

    /// <summary>List all normal-Admin accounts (readable by any authenticated admin).</summary>
    [HttpGet]
    public async Task<IActionResult> List(CancellationToken ct) =>
        Ok(await _mediator.Send(new GetAdminUsersRequest(), ct));

    [HttpPost]
    [Authorize(Roles = Roles.SuperAdmin)]
    public async Task<IActionResult> Create([FromBody] CreateAdminUserRequest request, CancellationToken ct) =>
        Ok(await _mediator.Send(request, ct));

    [HttpPatch("{id:guid}/permissions")]
    [Authorize(Roles = Roles.SuperAdmin)]
    public async Task<IActionResult> UpdatePermissions(Guid id, [FromBody] UpdateAdminPermissionsRequest request, CancellationToken ct)
    {
        request.UserId = id;
        return Ok(await _mediator.Send(request, ct));
    }

    [HttpPatch("{id:guid}/password")]
    [Authorize(Roles = Roles.SuperAdmin)]
    public async Task<IActionResult> ChangePassword(Guid id, [FromBody] ChangeAdminPasswordRequest request, CancellationToken ct)
    {
        request.UserId = id;
        await _mediator.Send(request, ct);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = Roles.SuperAdmin)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        await _mediator.Send(new DeleteAdminUserRequest(id), ct);
        return NoContent();
    }
}
