using System.Text.Json;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Contracts.RequestModels.Public;
using IkaPrasmul.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Commons.RequestHandlers.Public;

/// <summary>Maps the home-featured published story into the FeaturedAlumni shape
/// the home page consumes ({slug, name, class, role, photo, quote}).</summary>
public class GetFeaturedAlumniRequestHandler : IRequestHandler<GetFeaturedAlumniRequest, JsonElement?>
{
    private static readonly JsonSerializerOptions Options = new(JsonSerializerDefaults.Web);

    private readonly ApplicationDbContext _db;

    public GetFeaturedAlumniRequestHandler(ApplicationDbContext db) => _db = db;

    public async Task<JsonElement?> Handle(GetFeaturedAlumniRequest request, CancellationToken ct)
    {
        var story = await _db.Stories
            .Where(s => s.Status == ContentStatus.Published && s.IsFeaturedHome)
            .OrderBy(s => s.SortOrder)
            .FirstOrDefaultAsync(ct);

        if (story is null) return null;

        return JsonSerializer.SerializeToElement(new
        {
            slug = story.Slug,
            name = story.AuthorName,
            @class = story.AuthorClass,
            role = story.AuthorRole,
            photo = story.CoverImage,
            quote = story.Excerpt,
        }, Options);
    }
}
