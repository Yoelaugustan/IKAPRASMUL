# IKAPRASMUL — Alumni Portal

## Tech Stack

### Frontend
| Tech | Version |
|---|---|
| Next.js | 16 |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| TanStack Query | 5 |
| Zustand | 5 |
| Axios | 1 |
| Zod | 4 |

### Backend
| Tech | Version |
|---|---|
| .NET / ASP.NET Core | 8 |
| Entity Framework Core | 8 |
| PostgreSQL (Npgsql) | 8 |
| ASP.NET Identity | 8 |
| MediatR | 12 |
| FluentValidation | 11 |
| JWT Bearer | 8 |

---

## Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) 20+
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [PostgreSQL](https://www.postgresql.org/) 13+ running locally (or use the Docker path below)

---

### 1 — Backend

#### Set user secrets
From the `Backend-IKAPRASMUL/` directory:
```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=ikaprasmul;Username=postgres;Password=yourpassword"
dotnet user-secrets set "Jwt:Secret" "your-32-char-minimum-secret-key-here"
dotnet user-secrets set "Admin:Email" "admin@yourdomain.com"
dotnet user-secrets set "Admin:Password" "YourStrongPassword1!"
```

> SMTP is optional for local dev. To enable email, also set `Smtp:Host`, `Smtp:Port`, `Smtp:Username`, `Smtp:Password`.

#### Run migrations
```bash
cd Backend-IKAPRASMUL
dotnet ef database update -s IkaPrasmul.WebAPI
```

#### Start the API
```bash
dotnet run --project IkaPrasmul.WebAPI
```
API runs at `http://localhost:5000`. Swagger UI at `http://localhost:5000/scalar`.

---

### 2 — Frontend

#### Install dependencies
```bash
cd Frontend-IKAPRASMUL
npm install
```

#### Set environment variables
Create `Frontend-IKAPRASMUL/.env.local`:
```env
API_URL=http://localhost:5000
```

#### Start the dev server
```bash
npm run dev
```
App runs at `http://localhost:3000`. Admin panel at `http://localhost:3000/admin`.

---

## Running with Docker

Make sure Docker Desktop is running, then from the repo root:

#### Create a `.env` file
```env
POSTGRES_CONSTRING=Host=db;Port=5432;Database=ikaprasmul;Username=postgres;Password=yourpassword
JWT_SECRET=your-32-char-minimum-secret-key-here
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=YourStrongPassword1!
SMTP_USERNAME=
SMTP_PASSWORD=
FRONTEND_ORIGIN=http://localhost:3000
```

#### Start all services
```bash
docker compose up --build
```

Frontend → `http://localhost:3000`  
Backend → `http://localhost:8080`
