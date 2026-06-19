# Database auto-restore

Drop the database dump here as **`ikaprasmul.sql`** (plain-SQL format).

On the **first** `docker compose up`, PostgreSQL automatically runs every `*.sql`
file in this folder against the `ikaprasmul` database — so the dump is restored
with no manual step.

Notes:
- This only runs when the `pgdata` volume is empty (first boot). To re-run it,
  remove the volume first: `docker compose down -v` (this deletes all DB data).
- If your dump needs the `uuid-ossp` extension, make sure it includes
  `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";` near the top.
- Prefer restoring manually instead? Skip this folder and use
  `psql -h localhost -U postgres -d ikaprasmul -f ikaprasmul.sql` once the
  `db` container is up (port 5432 is published to the host).

The dump file itself is gitignored — it is not committed to the repo.
