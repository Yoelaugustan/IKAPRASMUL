using IkaPrasmul.Commons.Options;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Entities;
using IkaPrasmul.Infrastructure.Email;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IkaPrasmul.Infrastructure;

public static class DependencyInjection
{
    /// <summary>Registers infrastructure: the PostgreSQL DbContext, SMTP email,
    /// and the bound options.</summary>
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

        services.Configure<SmtpOptions>(configuration.GetSection(SmtpOptions.SectionName));
        services.Configure<ContactOptions>(configuration.GetSection(ContactOptions.SectionName));

        services.AddScoped<IEmailService, SmtpEmailService>();

        return services;
    }
}
