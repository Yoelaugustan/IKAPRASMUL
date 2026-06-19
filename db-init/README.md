# Database auto-restore

Drop the database dump here as **`ikaprasmul.sql`** (plain-SQL format).

On the **first** `docker compose up`, PostgreSQL automatically runs every `*.sql`
file in this folder against the `ikaprasmul` database — so the dump is restored
with no manual step.

Notes:
- The dump **must be plain SQL**, not a custom-format `pg_dump` (`-F c`) file.
  Auto-restore here uses `psql`, which cannot read custom/binary dumps. The
  provided `ikaprasmul.sql` is already plain SQL and tested on Postgres 13.
- This only runs when the `pgdata` volume is empty (first boot). To re-run it,
  remove the volume first: `docker compose down -v` (this deletes all DB data).
- No extension is required — the schema uses the built-in `uuid` type only.
- Prefer restoring manually instead? Skip this folder and use
  `psql -h localhost -U postgres -d ikaprasmul -f ikaprasmul.sql` once the
  `db` container is up (port 5432 is published to the host).

The dump file itself is gitignored — it is not committed to the repo.
