using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Entities;
using IkaPrasmul.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.WebAPI.Seeding;

/// <summary>
/// On startup, seeds the ContentItems table from <c>SeedData/seed.json</c> if it's
/// empty. The JSON is keyed by content type, each value an array of items
/// (the exact shapes the frontend consumes). Runs only when the app actually
/// starts — not during <c>dotnet ef</c> commands.
/// </summary>
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

            if (await db.ContentItems.AnyAsync(cancellationToken))
            {
                _logger.LogInformation("Content already seeded — skipping.");
                return;
            }

            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "seed.json");
            if (!File.Exists(path))
            {
                _logger.LogWarning("Seed file not found at {Path} — skipping seed.", path);
                return;
            }

            var json = await File.ReadAllTextAsync(path, cancellationToken);
            using var doc = JsonDocument.Parse(json);

            var items = new List<ContentItem>();
            foreach (var typeProperty in doc.RootElement.EnumerateObject())
            {
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

            db.ContentItems.AddRange(items);
            await db.SaveChangesAsync(cancellationToken);
            _logger.LogInformation("Seeded {Count} content items.", items.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Content seeding failed — did you run 'dotnet ef database update' first?");
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
