# D1-DRIZZLE-EXAMPLE

## Stack

- cloudflare workers
- cloudflare d1
- drizzle-orm
- GitHub Deploy Workflow (WIP)

## Setup

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

## Dev

```bash
$ pnpm install
$ pnpm wrangler d1 migrations apply <your-db-name> --local
$ pnpm wrangler dev --local --persist # or pnpm dev
```

## Dev: Local Migration

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
$ pnpm wrangler d1 migrations apply <your-db-name> --local
```

## Release from local

```bash
$ pnpm pnpm wrangler d1 migrations apply <your-db-name>
$ pnpm wrangler publish
```

## Release from CI

TODO

Put Cloudflare's API_TOKEN on GitHub Repository Secrets.

Create PR for `release/*` branch from GitHub Actions.

Merge PR then `.github/workflows/realese.yml` will run.

## LICENSE

MIT