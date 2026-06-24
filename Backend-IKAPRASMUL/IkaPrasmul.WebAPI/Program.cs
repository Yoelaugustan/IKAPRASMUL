using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.RateLimiting;
using IkaPrasmul.Commons;
using IkaPrasmul.Commons.Constants;
using IkaPrasmul.Commons.Options;
using IkaPrasmul.Entities;
using IkaPrasmul.Entities.Models;
using IkaPrasmul.Infrastructure;
using IkaPrasmul.Infrastructure.Security;
using IkaPrasmul.WebAPI.Middleware;
using IkaPrasmul.WebAPI.Seeding;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// --- Services ---------------------------------------------------------------
builder.Services.AddControllers().AddJsonOptions(options =>
{
    // Omit null optionals so the public read JSON matches the original sparse shape.
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

// Identity (admin accounts only — no public sign-up). Passphrase-friendly policy
// (min 8, no forced complexity) per security-standard §2.1.
builder.Services
    .AddIdentityCore<User>(options =>
    {
        options.Password.RequiredLength = 8;
        options.Password.RequireDigit = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.User.RequireUniqueEmail = true;
    })
    .AddRoles<IdentityRole<Guid>>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Override Identity's default hasher with Argon2id (security-standard §2.1).
builder.Services.AddScoped<IPasswordHasher<User>, Argon2PasswordHasher<User>>();

// JWT bearer auth. Pin the algorithm and validate iss/aud/lifetime/key; reject "none".
var jwt = builder.Configuration.GetSection(JwtOptions.SectionName).Get<JwtOptions>() ?? new JwtOptions();
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwt.Issuer,
            ValidAudience = jwt.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Secret)),
            ValidAlgorithms = new[] { SecurityAlgorithms.HmacSha256 },
            RoleClaimType = ClaimTypes.Role,
            ClockSkew = TimeSpan.FromSeconds(30),
        };
    });

builder.Services.AddAuthorizationBuilder()
    .AddPolicy("AdminOnly", policy => policy.RequireRole(Roles.Admin));

// Uploads are written under the web root and served by UseStaticFiles at /media/uploads.
builder.Services.PostConfigure<UploadOptions>(options =>
{
    var webRoot = builder.Environment.WebRootPath
        ?? Path.Combine(builder.Environment.ContentRootPath, "wwwroot");

    if (string.IsNullOrWhiteSpace(options.WebRootPath))
        options.WebRootPath = webRoot;

    if (string.IsNullOrWhiteSpace(options.RootPath))
        options.RootPath = Path.Combine(webRoot, "media", "uploads");
});

builder.Services.AddHostedService<ContentSeederHostedService>();
builder.Services.AddHostedService<AdminSeederHostedService>();

// CORS
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
app.UseStaticFiles();
app.UseCors("frontend");
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseSwagger(options =>
{
    options.RouteTemplate = "openapi/{documentName}.json";
});
app.MapScalarApiReference();

app.Run();

// Exposed so controllers can reference the rate-limit policy name, and so the
// integration-test host can target this entry point.
public partial class Program
{
    public const string PublicWritePolicy = "public-write";
}
