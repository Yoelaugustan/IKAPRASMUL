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

| Service  | Container port | Published on host | Notes |
|----------|----------------|-------------------|-------|
| frontend | 3000           | `localhost:3000`  | Host nginx proxies **all** traffic here |
| backend  | 8080           | *(not published)* | Internal only — reached by the frontend over the Docker network |
| db       | 5432           | `localhost:5432`  | Published for restore/DBeaver |

### nginx (host)

Point the host nginx at the **frontend only** — proxy everything to
`http://localhost:3000`. Do **not** add a separate `/api` route to the backend:
the Next.js frontend serves its own `/api/*` (contact, newsletter, auth) and
forwards to the backend internally. The backend is not published to the host, so
there is nothing external to misroute to.

## Database

- The `db` service is a **Postgres 13** container (matches the deployment
  server's version) with a persistent `pgdata` volume.
- Any `*.sql` placed in `./db-init/` is restored **once**, on the first boot
  (when the volume is empty). See [db-init/README.md](db-init/README.md).
- The provided `ikaprasmul.sql` is a **plain-SQL** dump, already tested to
  restore cleanly on Postgres 13. (Do not use a custom-format `pg_dump` dump
  here — `/docker-entrypoint-initdb.d` only runs plain `.sql`.)
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
