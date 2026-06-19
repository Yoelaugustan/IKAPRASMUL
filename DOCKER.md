# Running with Docker

The whole stack (PostgreSQL + .NET backend + Next.js frontend) runs from one
`docker-compose.yml`. **nginx stays on the host** and reverse-proxies to the
published container ports.

## Quick start

```bash
# 1. Configure secrets
cp .env.example .env
#    then edit .env  → POSTGRES_PASSWORD, SMTP_USERNAME, SMTP_PASSWORD,
#                      FRONTEND_ORIGIN, NEXT_PUBLIC_API_URL

# 2. (Optional) auto-restore the database
cp /path/to/ikaprasmul.sql ./db-init/ikaprasmul.sql

# 3. Build & run
docker compose up --build -d
```

That's it. After it boots:

| Service  | Container port | Published on host | Host nginx proxies |
|----------|----------------|-------------------|--------------------|
| frontend | 3000           | `localhost:3000`  | `https://<domain>`      |
| backend  | 8080           | `localhost:5080`  | `https://<domain>/api`  |
| db       | 5432           | `localhost:5432`  | (internal / DBeaver)    |

## Database

- The `db` service is a Postgres 16 container with a persistent `pgdata` volume.
- Any `*.sql` placed in `./db-init/` is restored **once**, on the first boot
  (when the volume is empty). See [db-init/README.md](db-init/README.md).
- Prefer your own host PostgreSQL instead? Delete the `db` service from
  `docker-compose.yml` and point `ConnectionStrings__DefaultConnection`
  (in the `backend` service) at your host DB.

## Environment variables

| Variable | Where | Notes |
|---|---|---|
| `POSTGRES_PASSWORD` | `.env` | DB password (user is `postgres`) |
| `SMTP_USERNAME` / `SMTP_PASSWORD` | `.env` | Brevo SMTP credentials |
| `FRONTEND_ORIGIN` | `.env` | Public site origin → backend CORS allow-list |
| `NEXT_PUBLIC_API_URL` | `.env` | Inlined into the frontend bundle **at build time** |
| `API_URL` | compose | `http://backend:8080` — server-side only, not public |

> `NEXT_PUBLIC_*` is baked in during `docker compose build`. If you change it,
> rebuild the frontend image (`docker compose build frontend`), don't just
> restart.

## Common commands

```bash
docker compose logs -f backend     # tail backend logs
docker compose up --build -d       # rebuild after code changes
docker compose down                # stop (keeps DB data)
docker compose down -v             # stop AND wipe the DB volume
```
