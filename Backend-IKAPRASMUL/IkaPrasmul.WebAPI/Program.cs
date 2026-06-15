using System.Threading.RateLimiting;
using IkaPrasmul.Commons;
using IkaPrasmul.Infrastructure;
using IkaPrasmul.WebAPI.Middleware;
using IkaPrasmul.WebAPI.Seeding;
using Microsoft.AspNetCore.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// --- Services ---------------------------------------------------------------
builder.Services.AddControllers();
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

// Seeds the ContentItems table from SeedData/seed.json on first startup.
builder.Services.AddHostedService<ContentSeederHostedService>();

// CORS — only the configured frontend origin(s) (security-standard §6.2).
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
builder.Services.AddCors(options =>
    options.AddPolicy("frontend", policy => policy
        .WithOrigins(allowedOrigins)
        .AllowAnyHeader()
        .AllowAnyMethod()));

// Rate limiting — 5 requests/min per IP on public write endpoints (§6.3).
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddPolicy(Program.PublicWritePolicy, httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 5,
                Window = TimeSpan.FromMinutes(1),
            }));
});

var app = builder.Build();

// --- Pipeline ---------------------------------------------------------------
app.UseExceptionHandler();
app.UseMiddleware<SecurityHeadersMiddleware>();
app.UseCors("frontend");
app.UseRateLimiter();
app.MapControllers();

app.Run();

// Exposed so controllers can reference the rate-limit policy name, and so the
// integration-test host can target this entry point.
public partial class Program
{
    public const string PublicWritePolicy = "public-write";
}
