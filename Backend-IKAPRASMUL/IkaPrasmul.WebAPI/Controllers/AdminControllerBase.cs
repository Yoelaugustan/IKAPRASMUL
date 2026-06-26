using System.Security.Claims;
using IkaPrasmul.Commons.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IkaPrasmul.WebAPI.Controllers;

/// <summary>
/// Base for all content-authoring controllers. Deny-by-default: every action
/// requires the Admin role (be-standard §5, security-standard §3). Exposes the
/// authenticated admin's email so handlers can stamp audit fields — set from the
/// validated token, never from the request body.
/// </summary>
[ApiController]
[Authorize(Roles = $"{Roles.Admin},{Roles.SuperAdmin}")]
public abstract class AdminControllerBase : ControllerBase
{
    protected string? ActorEmail =>
        User.FindFirstValue(ClaimTypes.Email)
        ?? User.FindFirstValue("email")
        ?? User.Identity?.Name;
}
