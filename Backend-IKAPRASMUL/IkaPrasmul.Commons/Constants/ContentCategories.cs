namespace IkaPrasmul.Commons.Constants;

/// <summary>
/// The editorial taxonomies, mirroring the frontend's
/// <c>src/constants/categories.ts</c> (the exact display strings stored on each
/// row). Used by the admin upsert validators to reject arbitrary values.
/// </summary>
public static class ContentCategories
{
    public static readonly string[] Story =
    {
        "Founder Stories",
        "Executive Journey",
        "International Alumni",
        "Impact Stories",
    };

    public static readonly string[] News =
    {
        "Campus News",
        "Alumni News",
        "Research & Publications",
        "Industry Trends",
        "Thought Leadership",
        "Newsletter",
    };

    public static readonly string[] Industries =
    {
        "Retail", "Startup", "F&B", "Consulting", "Manufacturing", "Services",
        "Creative", "Technology", "Healthcare", "Education", "Fashion", "Beauty", "Other",
    };
}
