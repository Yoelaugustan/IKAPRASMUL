using IkaPrasmul.Commons.Constants;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace IkaPrasmul.WebAPI.Filters;

/// <summary>Guards a controller or action so that only SuperAdmins or Admins with the
/// matching section permission can call it. Must be applied alongside
/// <c>[Authorize]</c> — it only runs after authentication succeeds.</summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public sealed class RequiresSectionAttribute(string section) : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.User;
        if (user.Identity?.IsAuthenticated != true)
        {
            context.Result = new UnauthorizedObjectResult("Not authenticated.");
            return;
        }

        if (user.IsInRole(Roles.SuperAdmin))
            return;

        var perms = user.FindFirst("perms")?.Value ?? string.Empty;
        var sections = perms.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        if (!sections.Contains(section, StringComparer.OrdinalIgnoreCase))
            context.Result = new ForbidResult();
    }
}
