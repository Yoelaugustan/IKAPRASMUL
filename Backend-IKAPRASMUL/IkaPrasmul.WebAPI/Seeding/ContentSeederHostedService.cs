using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Entities;
using IkaPrasmul.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.WebAPI.Seeding;

/// <summary>Runs only when the app starts — not during <c>dotnet ef</c> commands.</summary>
public class ContentSeederHostedService : IHostedService
{
    private readonly IServiceProvider _services;
    private readonly IHostEnvironment _environment;
    private readonly ILogger<ContentSeederHostedService> _logger;

    public ContentSeederHostedService(
        IServiceProvider services,
        IHostEnvironment environment,
        ILogger<ContentSeederHostedService> logger)
    {
        _services = services;
        _environment = environment;
        _logger = logger;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        try
        {
            using var scope = _services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "seed.json");
            if (!File.Exists(path))
            {
                _logger.LogWarning("Seed file not found at {Path} — skipping seed.", path);
                return;
            }

            var json = await File.ReadAllTextAsync(path, cancellationToken);
            using var doc = JsonDocument.Parse(json);

            // Seed per type: only add content types that aren't in the table yet,
            // so new types (e.g. a SIG split) get seeded without wiping the rest.
            var existingTypes = await db.ContentItems
                .Select(c => c.Type)
                .Distinct()
                .ToListAsync(cancellationToken);

            var items = new List<ContentItem>();
            foreach (var typeProperty in doc.RootElement.EnumerateObject())
            {
                if (existingTypes.Contains(typeProperty.Name))
                {
                    continue;
                }

                var sortOrder = 0;
                foreach (var element in typeProperty.Value.EnumerateArray())
                {
                    items.Add(new ContentItem
                    {
                        Id = Guid.NewGuid(),
                        Type = typeProperty.Name,
                        SortOrder = sortOrder++,
                        Status = ContentStatus.Published,
                        Json = element.GetRawText(),
                    });
                }
            }

            if (items.Count == 0)
            {
                _logger.LogInformation("All content types already seeded — nothing to add.");
                return;
            }

            db.ContentItems.AddRange(items);
            await db.SaveChangesAsync(cancellationToken);
            _logger.LogInformation(
                "Seeded {Count} content items ({Types}).",
                items.Count,
                string.Join(", ", items.Select(i => i.Type).Distinct()));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Content seeding failed — did you run 'dotnet ef database update' first?");
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
