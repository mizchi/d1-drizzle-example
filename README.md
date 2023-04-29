# D1-DRIZZLE-EXAMPLE

My cloudflare d1 and drizzle-orm example (or starter) repository.

## Stack

- Node.js
- cloudflare workers
- cloudflare d1
- drizzle-orm
- GitHub Deploy Workflow (WIP)

## Setup

Create your d1 database.

```bash
$ pnpm wrangler d1 create <your-db-name>

## Replace dzltest to your db name
## TODO(mizchi): refactor to skip this phase
$ git grep dzltest
.github/workflows/release.yml:      - run: pnpm wrangler d1 migrations apply dzltest
wrangler.toml:database_name = "dzltest"
```

```bash
$ pnpm install
```

Edit `wrangler.toml` for you.

```toml
name = "<your-app-name>"
main = "src/index.ts"
compatibility_date = "2023-04-29" # edit your date

[[ d1_databases ]]
binding = "DB"
database_name = "<your-db-name>"
database_id = "<your-db-id>"
```

## Develop

### Start Dev Server

```bash
## remove test migration script
# rm -r migrations/*
$ pnpm gen:migrate # pnpm drizzle-kit generate:sqlite --out migrations --schema src/schema.ts
$ pnpm wrangler d1 migrations apply <your-db-name> --local
$ pnpm dev # or pnpm wrangler dev --local --persist
```

### Local Migration

Edit drizzle schema.

```ts
// src/schema.ts
/*
  DO NOT RENAME THIS FILE FOR DRIZZLE-ORM TO WORK
*/
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey().notNull(),
  name: text('name').notNull(),
  // add column
  age: integer('age').notNull()
});
```

and apply it

```bash
$ pnpm gen:migrate # pnpm drizzle-kit generate:sqlite --out migrations --schema src/schema.ts
# git add migrations && git commit -m "..."
$ pnpm wrangler d1 migrations apply <your-db-name> --local
```

## Release

### migration and release from CI

Put Cloudflare's API_TOKEN on GitHub Repository Secrets. (Keep Secret!)

```bash
# push by your way. PR or direct push
$ git push origin main:release/$(date +%s)
```

`.github/workflows/release.yml` will run by push trigger.

```yml
      # edit here to release
      - run: pnpm wrangler d1 migrations apply <your-db-name>
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
      - run: pnpm wrangler publish
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

### migration and release from local to production

For escape hatch.

```bash
$ pnpm pnpm wrangler d1 migrations apply <your-db-name>
$ pnpm wrangler publish
```

## TODO

- [ ] Support preview
- [ ] Auto your-db-name replace
- [ ] Pass test
- [ ] Seed

## LICENSE

MIT