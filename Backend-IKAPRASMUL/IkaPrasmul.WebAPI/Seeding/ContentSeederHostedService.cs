using System.Text.Json;
using IkaPrasmul.Entities;
using IkaPrasmul.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.WebAPI.Seeding;

/// <summary>
/// Seeds the per-entity content tables from <c>SeedData/seed.json</c> on startup.
/// Idempotent per table: a table is only seeded when empty, so re-runs and partial
/// additions are safe. Runs only when the app starts — not during <c>dotnet ef</c>.
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

            var path = Path.Combine(_environment.ContentRootPath, "SeedData", "seed.json");
            if (!File.Exists(path))
            {
                _logger.LogWarning("Seed file not found at {Path} — skipping seed.", path);
                return;
            }

            var json = await File.ReadAllTextAsync(path, cancellationToken);
            using var doc = JsonDocument.Parse(json);
            var root = doc.RootElement;
            var seeded = new List<string>();

            await SeedAsync(db.SigGroups, root, "sigGroup", MapSigGroup, seeded, cancellationToken);
            await SeedAsync(db.SigSpotlights, root, "sigSpotlight", MapSigSpotlight, seeded, cancellationToken);
            await SeedAsync(db.Stories, root, "story", MapStory, seeded, cancellationToken);
            await SeedAsync(db.BusinessListings, root, "business", MapBusiness, seeded, cancellationToken);
            await SeedAsync(db.Articles, root, "article", MapArticle, seeded, cancellationToken);
            await SeedAsync(db.Events, root, "event", MapEvent, seeded, cancellationToken);

            if (seeded.Count == 0)
            {
                _logger.LogInformation("All content tables already seeded — nothing to add.");
                return;
            }

            await db.SaveChangesAsync(cancellationToken);
            _logger.LogInformation("Seeded content tables: {Tables}.", string.Join(", ", seeded));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Content seeding failed — did you run 'dotnet ef database update' first?");
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;

    private static async Task SeedAsync<TEntity>(
        DbSet<TEntity> set,
        JsonElement root,
        string typeKey,
        Func<JsonElement, int, TEntity> map,
        List<string> seeded,
        CancellationToken ct) where TEntity : class
    {
        if (await set.AnyAsync(ct)) return;
        if (!root.TryGetProperty(typeKey, out var array) || array.ValueKind != JsonValueKind.Array) return;

        var order = 0;
        foreach (var element in array.EnumerateArray())
        {
            set.Add(map(element, order++));
        }

        if (order > 0) seeded.Add(typeKey);
    }

    // ---- Per-type maps (JSON shape → entity) ----

    private static SigGroup MapSigGroup(JsonElement e, int order) => new()
    {
        Id = Guid.NewGuid(),
        Key = Str(e, "id") ?? string.Empty,
        Name = Str(e, "name") ?? string.Empty,
        ImageUrl = Str(e, "image"),
        Icon = Str(e, "icon"),
        Status = "Published",
        SortOrder = order,
        CreatedAt = DateTime.UtcNow,
    };

    private static SigSpotlight MapSigSpotlight(JsonElement e, int order) => new()
    {
        Id = Guid.NewGuid(),
        Key = Str(e, "id") ?? string.Empty,
        Name = Str(e, "name") ?? string.Empty,
        ImageUrl = Str(e, "image"),
        Description = Str(e, "description"),
        Status = "Published",
        SortOrder = order,
        CreatedAt = DateTime.UtcNow,
    };

    private static Story MapStory(JsonElement e, int order) => new()
    {
        Id = Guid.NewGuid(),
        Slug = Str(e, "slug") ?? string.Empty,
        Title = Str(e, "title") ?? string.Empty,
        Excerpt = Str(e, "excerpt"),
        Body = Str(e, "body"),
        Category = Str(e, "category") ?? string.Empty,
        AuthorName = Str(Obj(e, "author"), "name"),
        AuthorClass = Str(Obj(e, "author"), "class"),
        AuthorRole = Str(Obj(e, "author"), "role"),
        CoverImage = Str(e, "coverImage"),
        PublishedAt = Str(e, "publishedAt"),
        ReadMinutes = Int(e, "readMinutes"),
        IsFeatured = Bool(e, "isFeatured"),
        IsHighlight = Bool(e, "isHighlight"),
        IsFeaturedHome = Bool(e, "isFeaturedHome"),
        Status = "Published",
        SortOrder = order,
        CreatedAt = DateTime.UtcNow,
    };

    private static BusinessListing MapBusiness(JsonElement e, int order) => new()
    {
        Id = Guid.NewGuid(),
        Slug = Str(e, "slug") ?? string.Empty,
        Name = Str(e, "name") ?? string.Empty,
        Industry = Str(e, "industry") ?? string.Empty,
        FounderName = Str(Obj(e, "founder"), "name"),
        FounderClass = Str(Obj(e, "founder"), "class"),
        Location = Str(e, "location"),
        ShortDescription = Str(e, "shortDescription"),
        Description = Str(e, "description"),
        Logo = Str(e, "logo"),
        CoverImage = Str(e, "coverImage"),
        Website = Str(e, "website"),
        IsSpotlight = Bool(e, "isSpotlight"),
        IsFeatured = Bool(e, "isFeatured"),
        IsFeaturedHome = Bool(e, "isFeaturedHome"),
        Status = "Published",
        SortOrder = order,
        CreatedAt = DateTime.UtcNow,
    };

    private static Article MapArticle(JsonElement e, int order)
    {
        var category = Str(e, "category") ?? string.Empty;
        var isNewsletter = string.Equals(category, "Newsletter", StringComparison.OrdinalIgnoreCase);
        return new Article
        {
            Id = Guid.NewGuid(),
            Slug = Str(e, "slug") ?? string.Empty,
            Title = Str(e, "title") ?? string.Empty,
            Excerpt = Str(e, "excerpt"),
            Body = Str(e, "body"),
            Category = category,
            AuthorName = Str(Obj(e, "author"), "name"),
            AuthorClass = Str(Obj(e, "author"), "class"),
            CoverImage = Str(e, "coverImage"),
            PublishedAt = Str(e, "publishedAt"),
            ReadMinutes = Int(e, "readMinutes"),
            Views = Long(e, "views"),
            IsFeatured = Bool(e, "isFeatured"),
            IsTopStory = Bool(e, "isTopStory"),
            Type = Str(e, "type") ?? (isNewsletter ? "newsletter" : "article"),
            PdfUrl = Str(e, "pdfUrl"),
            Status = "Published",
            SortOrder = order,
            CreatedAt = DateTime.UtcNow,
        };
    }

    private static Event MapEvent(JsonElement e, int order) => new()
    {
        Id = Guid.NewGuid(),
        Slug = Str(e, "slug") ?? string.Empty,
        Title = Str(e, "title") ?? string.Empty,
        Date = Str(e, "date"),
        Location = Str(e, "location"),
        CoverImage = Str(e, "coverImage"),
        Description = Str(e, "description"),
        RegisterUrl = Str(e, "registerUrl"),
        Status = "Published",
        SortOrder = order,
        CreatedAt = DateTime.UtcNow,
    };

    // ---- JSON helpers ----

    private static JsonElement Obj(JsonElement e, string name) =>
        e.TryGetProperty(name, out var v) && v.ValueKind == JsonValueKind.Object ? v : default;

    private static string? Str(JsonElement e, string name) =>
        e.ValueKind == JsonValueKind.Object && e.TryGetProperty(name, out var v)
            && v.ValueKind == JsonValueKind.String
            ? v.GetString()
            : null;

    private static bool Bool(JsonElement e, string name) =>
        e.TryGetProperty(name, out var v)
        && (v.ValueKind == JsonValueKind.True || v.ValueKind == JsonValueKind.False)
        && v.GetBoolean();

    private static int Int(JsonElement e, string name) =>
        e.TryGetProperty(name, out var v) && v.ValueKind == JsonValueKind.Number && v.TryGetInt32(out var n)
            ? n : 0;

    private static long Long(JsonElement e, string name) =>
        e.TryGetProperty(name, out var v) && v.ValueKind == JsonValueKind.Number && v.TryGetInt64(out var n)
            ? n : 0;
}
