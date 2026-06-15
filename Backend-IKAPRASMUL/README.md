# IKAPRASMUL Backend (.NET 10)

Phase 1 — viewer-facing **Contact** + **Newsletter** endpoints, backed by PostgreSQL,
following `be-standard.md` (Clean Architecture + CQRS/MediatR). No admin/auth yet.

> Per the golden rule, this repo only contains **code**. You run the `dotnet` / `ef`
> commands below.

## Projects
| Project | Role |
|---|---|
| `IkaPrasmul.WebAPI` | HTTP API (controllers, middleware, `Program.cs`) — the only runnable project |
| `IkaPrasmul.Commons` | Application layer — MediatR handlers, validators, services |
| `IkaPrasmul.Contracts` | Request/response DTOs |
| `IkaPrasmul.Entities` | EF Core `DbContext`, entities, migrations |
| `IkaPrasmul.Infrastructure` | SMTP email + DbContext registration |

## Endpoints
| Method | Route | Body | Effect |
|---|---|---|---|
| POST | `/api/contact` | `{ fullName, email, subject, message }` | Stores a `ContactInquiry` **and** emails the admin |
| POST | `/api/newsletter/subscribe` | `{ email, source? }` | Stores a `NewsletterSubscription` (de-duped, re-activates) |

Both are public, rate-limited to **5 req/min per IP**.

## Prerequisites
- .NET 10 SDK (installed)
- PostgreSQL running locally (or a connection string to a managed instance)
- EF Core tools: `dotnet tool install --global dotnet-ef` (or `dotnet tool update --global dotnet-ef`)

## 1. Configure secrets (never commit these)
Run from the `IkaPrasmul.WebAPI` folder:

```bash
cd IkaPrasmul.WebAPI

# PostgreSQL connection
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=ikaprasmul;Username=postgres;Password=YOUR_DB_PASSWORD"

# SMTP (example: Gmail with an App Password — NOT your normal password)
dotnet user-secrets set "Smtp:Host" "smtp.gmail.com"
dotnet user-secrets set "Smtp:Port" "587"
dotnet user-secrets set "Smtp:Username" "youraddress@gmail.com"
dotnet user-secrets set "Smtp:Password" "your-16-char-app-password"
dotnet user-secrets set "Smtp:FromAddress" "youraddress@gmail.com"

# Where contact inquiries are emailed
dotnet user-secrets set "Contact:AdminEmail" "admin@ikaprasmul.org"
```

> **Gmail tip:** enable 2-Step Verification, then create an **App Password**
> (Google Account → Security → App passwords). Use that 16-char value above.
> Any SMTP provider works (Brevo, Mailtrap for testing, etc.) — just change `Smtp:*`.

## 2. Create the database schema
EF reads the connection string from user-secrets, which only load in the
**Development** environment — so set that for the `ef` commands.

PowerShell (from the `Backend-IKAPRASMUL` folder):
```powershell
$env:ASPNETCORE_ENVIRONMENT="Development"
dotnet ef migrations add InitialCreate --project IkaPrasmul.Entities --startup-project IkaPrasmul.WebAPI
dotnet ef database update            --project IkaPrasmul.Entities --startup-project IkaPrasmul.WebAPI
```

This creates the `NewsletterSubscriptions` and `ContactInquiries` tables.

## 3. Run
```bash
dotnet run --project IkaPrasmul.WebAPI
```
API listens on `http://localhost:5080` (and `https://localhost:7080`).

## 4. Smoke-test
```bash
curl -X POST http://localhost:5080/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source":"footer"}'

curl -X POST http://localhost:5080/api/contact \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Jane Doe","email":"jane@example.com","subject":"General Inquiry","message":"Hello!"}'
```

A successful contact submit stores the inquiry and sends an email to `Contact:AdminEmail`.

## Notes / deferred to later phases
- **Serilog, Hangfire, auth, and the `/api/admin/*` CMS** are intentionally not here yet (Phase 1 is viewer-side Contact + Newsletter).
- **Phase 2** will add the content entities (SIG, Story, Article, Business, Event, About, Home) + a seed of the current `Frontend-IKAPRASMUL/src/data/*` and the public GET endpoints.
- Package versions are centralized in `Directory.Packages.props`. If `dotnet restore` reports a version that can't be resolved, bump it there.
- The front-end is **not** wired to these endpoints yet — that's the next step once you confirm the API runs.
