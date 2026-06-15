using IkaPrasmul.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace IkaPrasmul.Entities;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<NewsletterSubscription> NewsletterSubscriptions => Set<NewsletterSubscription>();
    public DbSet<ContactInquiry> ContactInquiries => Set<ContactInquiry>();
    public DbSet<ContentItem> ContentItems => Set<ContentItem>();

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

        modelBuilder.Entity<ContentItem>(e =>
        {
            // The read endpoints query by type + status and order by SortOrder.
            e.HasIndex(x => new { x.Type, x.Status, x.SortOrder });
        });
    }
}
