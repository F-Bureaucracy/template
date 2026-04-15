# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start dev server on port 3000
bun build        # Production build
bun test         # Run tests with Vitest
bun lint         # Biome lint
bun check        # Biome check + auto-fix
bun deploy       # Build + deploy to Cloudflare Workers

# Database
bun db:push      # Push schema to DB (dev)
```

## Architecture

Full-stack React SPA with SSR via TanStack Start, deployed to Cloudflare Workers.

**Core stack**: React 19, TanStack Router (file-based), TanStack Query, TanStack Form, Vite, Nitro, TypeScript

**Routing**: File-based via `src/routes/`. Auto-generated route tree at `src/routeTree.gen.ts` — never edit this file manually. Server functions use `@tanstack/react-start` for RPC-style calls. Route protection via `beforeLoad` middleware.

**Auth**: Better Auth (`src/lib/auth.ts` server, `src/lib/auth-client.ts` client). Drizzle adapter with Turso/SQLite. Admin plugin enabled. Auth API handled at `src/routes/api/auth/$.ts`.

**Database**: Drizzle ORM + Turso (edge SQLite). Schema files in `src/db/schema/` — `auth.ts` for auth tables, `example.ts` as a template for new schemas. All schemas re-exported from `src/db/schema/index.ts`.

**UI**: shadcn/ui components in `src/components/ui/`, Tailwind CSS v4, Lucide icons, Sonner toasts, next-themes for dark mode.

**Forms**: TanStack Form + Zod validation (not react-hook-form despite it being installed).

## Environment Variables

Required in `.env.local`:

```
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=libsql://[db].turso.io
DATABASE_AUTH_TOKEN=
```

Server env is validated at startup via `@t3-oss/env-core` + Zod in `src/env.ts`. Client-side vars must be prefixed with `VITE_`.

## TypeScript Path Aliases

Use `#/*` for imports from `src/`:
```ts
import { auth } from "#/lib/auth"
```

## Linting/Formatting

Biome (not ESLint/Prettier). Uses tabs. Run `bun check` to auto-fix. The `noChildrenProp` rule is disabled.

## Deployment

Deploys to Cloudflare Workers via Wrangler. Config in `wrangler.jsonc`. The `THREAD_ID` env var sets the deployment name during `bun deploy`.
