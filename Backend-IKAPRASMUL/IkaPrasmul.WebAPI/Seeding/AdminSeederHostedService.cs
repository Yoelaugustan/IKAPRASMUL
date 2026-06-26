using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Entities.Models;
using Microsoft.AspNetCore.Identity;

namespace IkaPrasmul.WebAPI.Seeding;

/// <summary>
/// Ensures the Admin role and a single seeded admin account exist (be-standard §6.1 —
/// no public sign-up). Credentials come from config/user-secrets (<c>Admin:Email</c>,
/// <c>Admin:Password</c>) and are never hardcoded (security-standard §11).
/// </summary>
public class AdminSeederHostedService : IHostedService
{
    private readonly IServiceProvider _services;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AdminSeederHostedService> _logger;

    public AdminSeederHostedService(
        IServiceProvider services,
        IConfiguration configuration,
        ILogger<AdminSeederHostedService> logger)
    {
        _services = services;
        _configuration = configuration;
        _logger = logger;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        try
        {
            using var scope = _services.CreateScope();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

            // Ensure both roles exist.
            foreach (var roleName in new[] { Roles.SuperAdmin, Roles.Admin })
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                    await roleManager.CreateAsync(new IdentityRole<Guid>(roleName) { Id = Guid.NewGuid() });
            }

            var email = _configuration["Admin:Email"];
            var password = _configuration["Admin:Password"];
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
            {
                _logger.LogWarning(
                    "Admin:Email / Admin:Password not configured — skipping admin seed. "
                    + "Set them via user-secrets to create the first super-admin.");
                return;
            }

            var existingUser = await userManager.FindByEmailAsync(email);
            if (existingUser is not null)
            {
                // Promote to SuperAdmin on existing installs that still have Admin role.
                if (!await userManager.IsInRoleAsync(existingUser, Roles.SuperAdmin))
                {
                    await userManager.RemoveFromRoleAsync(existingUser, Roles.Admin);
                    await userManager.AddToRoleAsync(existingUser, Roles.SuperAdmin);
                    _logger.LogInformation("Promoted admin {UserId} to SuperAdmin.", existingUser.Id);
                }
                return;
            }

            var user = new User
            {
                Id = Guid.NewGuid(),
                UserName = email,
                Email = email,
                EmailConfirmed = true,
            };

            var result = await userManager.CreateAsync(user, password);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, Roles.SuperAdmin);
                _logger.LogInformation("Seeded super-admin user {UserId}.", user.Id);
            }
            else
            {
                _logger.LogError("Failed to seed super-admin user: {Errors}",
                    string.Join("; ", result.Errors.Select(e => e.Description)));
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Admin seeding failed — did you run 'dotnet ef database update' first?");
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
