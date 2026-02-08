# AGENTS.md

## Purpose
This document provides operating instructions for engineering agents working on Qunt Edge.
Apply these rules when implementing, reviewing, or shipping changes in this repository.

## Product Context
- Qunt Edge is a trading analytics platform for futures and prop-firm workflows.
- Core domains: trade ingestion, analytics dashboards, journaling, AI analysis, teams, and billing.
- Primary risk areas: financial data correctness, import integrity, auth/security boundaries, and payment webhook handling.

## App Explanation (Engineering View)
- Runtime model: Next.js App Router with mixed server/client components and API routes in `app/api`.
- Data flow: broker/file ingestion -> normalization/storage -> dashboard/query surfaces -> journaling/review -> AI-assisted analysis.
- Core UX surfaces:
  - Dashboard (`app/[locale]/dashboard`): widgets, charts, summaries, and performance exploration.
  - Data/import flows: broker sync and file import pipelines with mapping/validation.
  - Teams/admin/billing areas: access control, account/org settings, and payment lifecycle handling.
- Integration points: Supabase (auth/storage), Prisma/Postgres (data), OpenAI (analysis helpers), Whop (payments/webhooks).
- Localization: i18n via locale files and localized routes.

## Tech Stack
- Framework: Next.js App Router (`app/`)
- Language: TypeScript (strict)
- UI: React 19, Tailwind, Radix
- Data: Prisma + PostgreSQL (Supabase)
- Auth/Storage: Supabase
- AI: OpenAI integrations
- Payments: Whop webhooks and plan configs
- Testing: Vitest

## Repo Map
- `app/`: routes, layouts, API handlers
- `components/`: UI and feature components
- `server/`: server-side business logic and services
- `lib/`: utilities and shared helpers
- `store/`: Zustand stores
- `prisma/`: schema and db utilities
- `scripts/`: build/sync/ops scripts

## Operating Principles
- Prefer minimal, targeted changes over broad refactors.
- Preserve existing architecture and naming conventions.
- Keep business logic out of client components when possible.
- Do not silently change behavior in trading math, imports, or billing flows.
- If assumptions are required, document them in PR/commit notes.
- Always revalidate `user-data-${userId}` tag in server actions that modify accounts, trades, or sync tokens to ensure instant dashboard updates.

## Safety-Critical Areas

### Trading and Analytics
- Treat PnL, fees, size, and time normalization as correctness-critical.
- Avoid rounding changes unless explicitly requested and validated.
- Keep timezone handling explicit and consistent.

### Imports and Parsing
- Maintain backward compatibility for CSV/PDF and broker mappings.
- Fail clearly on malformed data; do not hide parse errors.
- Preserve idempotency where imports can be retried.

### Auth and Permissions
- Enforce user/team scoping on all data access paths.
- Never expose service-role secrets to the client.
- Validate API authorization, not only UI-level checks.

### Payments and Webhooks
- Keep webhook handlers deterministic and idempotent.
- Verify signature/secret checks are preserved.
- Ensure plan ID changes remain synchronized with config and env docs.

## Change Workflow
1. Read relevant files and existing patterns before editing.
2. Implement the smallest coherent fix.
3. Run validation commands for impacted scope.
4. Confirm no obvious regressions in critical paths.
5. Summarize behavior changes and residual risks.

## Validation Commands
Use npm scripts already defined in this repo:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Additional targeted commands:

```bash
npm run test:payment
npm run test:coverage
```

## Coding Rules
- Prefer server-side validation for any user-provided data.
- Add or update types before adding runtime workarounds.
- Avoid `any` unless unavoidable and justified.
- Keep functions focused; extract helpers for repeated logic.
- Use clear error messages with enough diagnostic context.
- Add comments only for non-obvious decisions.

## API and Data Contracts
- Do not break existing response shapes without migration strategy.
- Treat persisted data schema changes as explicit migrations.
- For new fields, define defaults and nullability intentionally.
- Validate external payloads at boundaries.

## Performance Expectations
- Avoid unnecessary client re-renders and heavy synchronous work.
- Keep bundle impact in mind for shared UI modules.
- Prefer pagination/chunking for potentially large datasets.

## Observability and Debuggability
- Preserve useful logs around imports, sync, and webhook processing.
- Avoid logging sensitive data (tokens, secrets, PII-heavy payloads).
- Include contextual identifiers (user/team/import/job IDs) when safe.

## Definition of Done
A change is done when:
- Behavior is implemented and matches requested scope.
- Lint/type/tests for impacted areas pass.
- Critical paths (imports, analytics correctness, auth, payments) remain intact.
- Notes include what changed, why, and any follow-up work.

## Non-Goals for Routine Tasks
- Large design overhauls unrelated to request.
- Cross-cutting refactors without measurable benefit.
- Dependency upgrades unless required to complete the task.

## Escalation Guidance
Escalate to a human reviewer when:
- Financial calculations produce ambiguous results.
- Broker payload changes require domain interpretation.
- Security/auth edge cases are uncertain.
- Payment lifecycle events conflict or duplicate unexpectedly.

## Recent Changes (Last 30 Commits)
1. `43b8e9c` (2026-02-08): docs: update AGENTS.md with latest changes and cache guidelines
2. `0ef1430` (2026-02-08): fix: resolve Tradovate sync and trade import data visibility issues
3. `0698a70` (2026-02-08): Add bulk sync translations for Tradovate
4. `f0b751c` (2026-02-08): Update Tradovate sync route and context
5. `420e951` (2026-02-08): Handle Prisma P3005 by baselining migrations in CI build
6. `6a10979` (2026-02-08): Fix client crash and add Prisma DB sync in build
7. `803a85f` (2026-02-08): chore: update chart-the-future-panel
8. `d682678` (2026-02-08): chore: update dashboard and api components
9. `1694ca1` (2026-02-08): chore: force update codebase
10. `4e02294` (2026-02-08): chore: Clean up unused files and components
11. `bc03704` (2026-02-08): chore: update codebase
12. `9630591` (2026-02-08): Revert home page sidebar changes
13. `83e7aef` (2026-02-08): Update Hero metrics and messaging
14. `4e216b3` (2026-02-08): Add dashboard chart and update widget/sidebar integration
15. `0aa0889` (2026-02-08): Unify widget shell styling and dashboard UI updates
16. `2568eb5` (2026-02-08): Reduce dashboard widget grid gap to 6x6
17. `e98800d` (2026-02-08): Optimize dashboard widget loading with lazy split and mobile summary fix
18. `9fd4304` (2026-02-08): doc updates
19. `3cf798c` (2026-02-08): Refresh data provider context
20. `09dba7b` (2026-02-08): Update French terms localization
21. `2476e6b` (2026-02-08): Update terms localization
22. `a8219ae` (2026-02-08): Update README
23. `634175c` (2026-02-08): Update dashboard and landing UI
24. `28c0c95` (2026-02-08): chore: reduce lint warnings in community and payment service
25. `69d9b50` (2026-02-08): Refine home UX with minimal layout and motion polish
26. `5fe2bea` (2026-02-08): Refine and blend sidebar design with legacy active styling
27. `b99036e` (2026-02-08): Update home and landing UI components
28. `5479ff0` (2026-02-08): chore: update codebase
29. `377b2d4` (2026-02-07): Unify marketing + dashboard UI and harden routing/typecheck
30. `18cc67d` (2026-02-07): Update landing update page, app layout, and package config
