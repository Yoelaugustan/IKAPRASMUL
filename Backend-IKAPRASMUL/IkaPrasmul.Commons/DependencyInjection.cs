using FluentValidation;
using IkaPrasmul.Commons.Behaviors;
using Microsoft.Extensions.DependencyInjection;

namespace IkaPrasmul.Commons;

public static class DependencyInjection
{
    /// <summary>Registers the application layer: MediatR handlers, the validation
    /// pipeline behavior, and all FluentValidation validators in this assembly.</summary>
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        var assembly = typeof(DependencyInjection).Assembly;

        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(assembly);
            // MediatR 12.5 does not auto-scan behaviors — register explicitly.
            cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
        });

        services.AddValidatorsFromAssembly(assembly);

        return services;
    }
}
