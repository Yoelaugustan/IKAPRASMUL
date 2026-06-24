using IkaPrasmul.Commons.Options;
using IkaPrasmul.Commons.Services;
using IkaPrasmul.Entities;
using IkaPrasmul.Infrastructure.Email;
using IkaPrasmul.Infrastructure.FileStorage;
using IkaPrasmul.Infrastructure.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IkaPrasmul.Infrastructure;

public static class DependencyInjection
{
    /// <summary>Registers infrastructure: the PostgreSQL DbContext, SMTP email,
    /// JWT token + file-storage services, and the bound options.</summary>
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

        services.Configure<SmtpOptions>(configuration.GetSection(SmtpOptions.SectionName));
        services.Configure<ContactOptions>(configuration.GetSection(ContactOptions.SectionName));
        services.Configure<JwtOptions>(configuration.GetSection(JwtOptions.SectionName));
        services.Configure<UploadOptions>(configuration.GetSection(UploadOptions.SectionName));

        services.AddScoped<IEmailService, SmtpEmailService>();
        services.AddSingleton<ITokenService, JwtTokenService>();
        services.AddScoped<IFileStorageService, LocalFileStorageService>();

        return services;
    }
}
