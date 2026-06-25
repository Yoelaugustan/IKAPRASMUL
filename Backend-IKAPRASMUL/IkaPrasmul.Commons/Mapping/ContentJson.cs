using System.Text.Json;
using System.Text.Json.Serialization;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Entities.Models;

namespace IkaPrasmul.Commons.Mapping;

/// <summary>
/// Single source of truth for projecting content entities back into the exact
/// JSON shape the frontend consumes (camelCase, nested author/founder, null
/// fields omitted). Used by both the public read handlers and the admin-list
/// handlers so the contract can never drift between them.
/// </summary>
public static class ContentJson
{
    private static readonly JsonSerializerOptions Options = new(JsonSerializerDefaults.Web)
    {
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    };

    private static JsonElement To(object value) => JsonSerializer.SerializeToElement(value, Options);

    private static bool IsDraft(string status) => status == ContentStatus.Draft;

    public static JsonElement SigGroup(SigGroup g) => To(new
    {
        id = g.Key,
        name = g.Name,
        image = g.ImageUrl,
        icon = g.Icon,
    });

    public static JsonElement SigSpotlight(SigSpotlight s) => To(new
    {
        id = s.Key,
        name = s.Name,
        image = s.ImageUrl,
        description = s.Description,
        isSpotlight = s.IsSpotlight,
        isDraft = IsDraft(s.Status),
    });

    public static JsonElement Story(Story s) => To(new
    {
        slug = s.Slug,
        title = s.Title,
        excerpt = s.Excerpt,
        body = s.Body,
        category = s.Category,
        author = new { name = s.AuthorName, @class = s.AuthorClass, role = s.AuthorRole },
        coverImage = s.CoverImage,
        publishedAt = s.PublishedAt,
        readMinutes = s.ReadMinutes,
        isFeatured = s.IsFeatured,
        isHighlight = s.IsHighlight,
        isFeaturedHome = s.IsFeaturedHome,
        isDraft = IsDraft(s.Status),
    });

    public static JsonElement Business(BusinessListing b) => To(new
    {
        slug = b.Slug,
        name = b.Name,
        industry = b.Industry,
        founder = new { name = b.FounderName, @class = b.FounderClass },
        location = b.Location,
        shortDescription = b.ShortDescription,
        description = b.Description,
        logo = b.Logo,
        coverImage = b.CoverImage,
        website = b.Website,
        isSpotlight = b.IsSpotlight,
        isFeatured = b.IsFeatured,
        isFeaturedHome = b.IsFeaturedHome,
        isDraft = IsDraft(b.Status),
    });

    public static JsonElement Article(Article a) => To(new
    {
        slug = a.Slug,
        title = a.Title,
        excerpt = a.Excerpt,
        body = a.Body,
        category = a.Category,
        author = new { name = a.AuthorName, @class = a.AuthorClass },
        coverImage = a.CoverImage,
        publishedAt = a.PublishedAt,
        readMinutes = a.ReadMinutes,
        views = a.Views,
        isFeatured = a.IsFeatured,
        isTopStory = a.IsTopStory,
        type = a.Type,
        pdfUrl = a.PdfUrl,
        isDraft = IsDraft(a.Status),
    });

    public static JsonElement Event(Event e) => To(new
    {
        slug = e.Slug,
        title = e.Title,
        date = e.Date,
        location = e.Location,
        coverImage = e.CoverImage,
        description = e.Description,
        registerUrl = e.RegisterUrl,
    });
}
