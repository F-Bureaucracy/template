# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Dev server on port 3000
bun build        # Production build
bun test         # Run tests with Vitest
bun run check    # Lint + format with Biome (run before committing)
bun run format   # Format code
bun run lint     # Lint code

bun run db:generate  # Generate Drizzle migrations
bun run db:migrate   # Apply migrations
bun run db:push      # Push schema directly (no migration file)
bun run db:studio    # Open Drizzle Studio UI
```

## Architecture

**Stack**: TanStack Start (full-stack React framework) + Nitro server + PostgreSQL via Drizzle ORM + Better Auth

### Routing

File-based routing via TanStack Router. Routes live in `src/routes/`. The file `src/routeTree.gen.ts` is **auto-generated** — never edit it manually. Nested folders create nested routes; `__root.tsx` is the layout wrapper; `$.tsx` is a catch-all (used for the auth API handler).

The router is initialized in `src/router.tsx` with QueryClient passed as context. Default preload strategy is `intent` (hover).

### Data Fetching

TanStack Query manages server state. The QueryClient is set up in `src/integrations/tanstack-query/root-provider.tsx` and injected into router context. Use route loaders for data that must be present before render; use Query for data that can load async.

### Authentication

Better Auth is configured in `src/lib/auth.ts` (server) and `src/lib/auth-client.ts` (browser). The auth API handler lives at `src/routes/api/auth/$.ts`. Use `authClient.useSession()` to access session state in components. Authentication uses cookies via the TanStack Start cookies plugin.

### Database

Drizzle ORM with PostgreSQL (`pg` package). Schema defined in `src/db/schema.ts`. Connection instance in `src/db/index.ts`. Requires `DATABASE_URL` environment variable.

### Environment Variables

T3Env provides type-safe env vars in `src/env.ts`. Server-only vars go in the `server` block; client-accessible vars use the `VITE_` prefix and go in the `client` block.

### UI Components

50+ shadcn/ui components (New York style, Zinc base color) live in `src/components/ui/`. They use Radix UI primitives, CVA for variants, and the `cn()` utility from `src/lib/utils.ts` for conditional Tailwind classes.

### Styling

Tailwind CSS 4 with a Vite plugin. Design tokens (custom colors: sea-ink, lagoon, palm) and dark mode CSS variables are defined in `src/styles.css`. Dark mode uses the `.dark` class selector. The theme toggle (light/dark/auto) persists to localStorage.

### Path Aliases

Both `#/*` and `@/*` resolve to `./src/*`.

## Key Conventions

- **Linter/Formatter**: Biome (not ESLint/Prettier). Tabs for indentation, double quotes.
- **Validation**: Zod 4 throughout — forms, env vars, API schemas.
- **Forms**: TanStack Form is the primary form library; `react-hook-form` is also available.
- **Icons**: Lucide React.
- **Toasts**: Sonner (provider in `__root.tsx`).
- **Tests**: Vitest + Testing Library + jsdom. No test files exist yet in the template.
