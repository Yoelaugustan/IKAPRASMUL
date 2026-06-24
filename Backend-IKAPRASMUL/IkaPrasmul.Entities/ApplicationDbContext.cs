using IkaPrasmul.Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Entities;

public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<NewsletterSubscription> NewsletterSubscriptions => Set<NewsletterSubscription>();
    public DbSet<ContactInquiry> ContactInquiries => Set<ContactInquiry>();

    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

    // Per-entity content tables (be-standard §7), replacing the ContentItem JSON store.
    public DbSet<SigGroup> SigGroups => Set<SigGroup>();
    public DbSet<SigSpotlight> SigSpotlights => Set<SigSpotlight>();
    public DbSet<Story> Stories => Set<Story>();
    public DbSet<BusinessListing> BusinessListings => Set<BusinessListing>();
    public DbSet<Article> Articles => Set<Article>();
    public DbSet<Event> Events => Set<Event>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<NewsletterSubscription>(e =>
        {
            // Email is stored lowercased and must be unique across the table.
            e.HasIndex(x => x.Email).IsUnique();
        });

        modelBuilder.Entity<ContactInquiry>(e =>
        {
            e.HasIndex(x => x.CreatedAt);
        });

        modelBuilder.Entity<RefreshToken>(e =>
        {
            e.HasIndex(x => x.TokenHash);
            e.HasIndex(x => x.UserId);
        });

        // Content read endpoints query by Status and order by SortOrder; the key
        // column is the public identifier (slug / id) and must be unique.
        modelBuilder.Entity<SigGroup>(e => e.HasIndex(x => x.Key).IsUnique());
        modelBuilder.Entity<SigSpotlight>(e => e.HasIndex(x => x.Key).IsUnique());
        modelBuilder.Entity<Story>(e => e.HasIndex(x => x.Slug).IsUnique());
        modelBuilder.Entity<BusinessListing>(e => e.HasIndex(x => x.Slug).IsUnique());
        modelBuilder.Entity<Article>(e => e.HasIndex(x => x.Slug).IsUnique());
        modelBuilder.Entity<Event>(e => e.HasIndex(x => x.Slug).IsUnique());
    }
}
