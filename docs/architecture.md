# Architecture

## Overview

CN Finance has two components that share no runtime dependencies:

```
cn-finance/
├── skills/     ← Portable Claude skill definitions (Markdown + JSON)
└── web/        ← Static Next.js showcase site (Vercel)
```

The two components are intentionally decoupled. The `web/` site reads metadata from `web/content/verticals.ts` — a TypeScript file maintained separately from the actual `SKILL.md` files. This means the showcase site can be updated independently of the skills, and vice versa.

---

## Skills layer

Skills are plain Markdown files with YAML frontmatter. There is no build step and no runtime — a skill is just a system prompt fragment.

```
skills/plugins/vertical-plugins/[vertical]/
├── .claude-plugin/
│   └── plugin.json         ← Plugin metadata (name, version, description)
├── skills/
│   └── [skill-name]/
│       └── SKILL.md        ← System prompt + instructions
└── commands/               ← Slash command registration
```

### Plugin manifest

```json
{
  "name": "investment-banking",
  "version": "1.2.0",
  "description": "Claude skills for investment banking workflows",
  "skills": ["buyer-list", "cim-builder", "pitch-deck", "merger-model", "teaser"]
}
```

### SKILL.md format

```markdown
---
name: pitch-deck
description: Create a full investment banking pitch deck...
---

## Overview
...

## Instructions
...

## Output format
...
```

### Deployment modes

The same `SKILL.md` works in both:

1. **Plugin mode** — installed into Claude for Work via the CLI or marketplace. Skills activate as slash commands.
2. **Managed Agent mode** — the `SKILL.md` content is passed as the `system` prompt to the Anthropic API. The managed-agent-cookbooks show how to wire this up.

---

## Agents layer

Agents bundle multiple skills into a single end-to-end workflow. Each agent lives in `skills/plugins/agent-plugins/` and includes copies of the skills it uses.

```
agent-plugins/pitch-agent/
├── .claude-plugin/plugin.json
└── skills/
    ├── comps-analysis/SKILL.md
    ├── dcf-model/SKILL.md
    ├── lbo-model/SKILL.md
    └── pitch-deck/SKILL.md
```

Agents are designed to run sequentially — each skill's output feeds into the next. The `pitch-agent`, for example, runs comps → DCF → LBO → pitch-deck in one invocation.

---

## Web layer

The showcase site is a standard Next.js 14 App Router project deployed as a fully static site on Vercel.

```
web/
├── app/
│   ├── layout.tsx              ← Root layout (Header + Footer)
│   ├── page.tsx                ← Landing page
│   └── skills/[slug]/
│       └── page.tsx            ← Skill detail page (SSG)
├── components/
│   ├── layout/                 ← Header, Footer
│   ├── ui/                     ← Button, Card, Badge
│   └── sections/               ← Landing page sections
├── content/
│   └── verticals.ts            ← Source of truth for all skill metadata
└── public/
    └── demos/[vertical]/       ← Screenshots, sample PDFs
```

### Data flow

```
verticals.ts  ──→  app/page.tsx           (landing page, skill grid)
              ──→  app/skills/[slug]/     (detail page, generateStaticParams)
```

All pages are statically generated at build time. There are no API routes and no server-side data fetching.

### Design system

The site uses Tailwind CSS with a custom color palette defined in `tailwind.config.ts`. Never use raw hex values in components — always use the token names:

| Token | Value | Usage |
|---|---|---|
| `primary` | `#2E8B57` | CTAs, active states, highlights |
| `primary-dark` | `#1f6b40` | Hover states |
| `primary-light` | `#e8f5ee` | Chip backgrounds |
| `surface` | `#ffffff` | Cards, panels |
| `surface-alt` | `#f9f7f4` | Page background (warm off-white) |
| `border` | `#e2e8f0` | Dividers, card borders |
| `text` | `#0f172a` | Headings |
| `text-muted` | `#64748b` | Body text |
| `accent-gold` | `#b5922a` | Financial data emphasis |
