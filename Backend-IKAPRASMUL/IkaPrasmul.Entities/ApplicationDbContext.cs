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
    }
}
