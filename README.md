# log

A living, flexible work & idea log. Markdown is the source of truth; the site is
just a nice way to look at it. Built to be maintained by hand **or** by asking
Claude — either way, you're only ever editing plain markdown.

## The flow: capture → triage → work

```
inbox.md  →  ideas/  →  projects/  →  log/
 dump        keepers     building     what happened
```

1. **`content/inbox.md`** — one bullet per thought. No structure, no
   commitment. The only rule: get it out of your head and onto disk.
2. **`content/ideas/`** — things from the inbox worth a second thought.
3. **`content/projects/`** — things you're actually building. Each has a
   `status` (see below).
4. **`content/log/`** — dated notes on what happened.

Nothing forces you down this path. A thought can live in the inbox forever. A
project can skip straight from spark to abandoned. The structure is there to
catch things, not to discipline you.

## Project status — a lifecycle, not a scorecard

```
spark → active → paused → shipped
                   ↓
                abandoned
```

| status      | meaning                                              |
| ----------- | ---------------------------------------------------- |
| `spark`     | freshly excited, just caught fire                    |
| `active`    | actually working on it now                           |
| `paused`    | dropped for now — the normal resting state, no guilt |
| `shipped`   | done and in use                                      |
| `abandoned` | deliberately let go                                  |

`paused` is the important one. Things you drop don't disappear — the home page's
**Resurface** section floats the longest-dormant ones back up, so a project from
last summer comes and finds *you*.

## Adding things by hand

Each folder takes markdown with a little frontmatter. Copy a template:

**Inbox** — just append a bullet to `content/inbox.md`. That's it.

**Idea** — `content/ideas/some-idea.md`:

```markdown
---
title: Short name # optional
captured: 2026-06-14
tags: [tooling] # optional
---

What the idea is, in as many or few words as you like.
```

**Project** — `content/projects/some-project.md`:

```markdown
---
title: Project name
status: spark # spark | active | paused | shipped | abandoned
started: 2026-06-14 # optional
updated: 2026-06-14 # optional — bump this when you touch it; drives Resurface
summary: One line for the dashboard. # optional
tags: [hardware, weekend] # optional
---

Notes, checklists, whatever helps.
```

**Log entry** — `content/log/2026-06-14-what-happened.md`:

```markdown
---
title: Short headline # optional
date: 2026-06-14
project: some-project # optional — links to a project by its filename
tags: [win] # optional
pinned: false # optional
---

What you did or were thinking about.
```

The filename (minus `.md`) is the entry's id. For a project, that id is what you
put in a log entry's `project:` field to link them. Only `title` (projects),
`date` (log), and `captured` (ideas) are required — everything else is optional,
so capturing never blocks on metadata.

## Asking Claude to maintain it

Plain requests work — for example:

- "Dump _\<thought\>_ to the inbox."
- "Log what I did today: _\<summary\>_."
- "Add a project for _\<thing\>_, mark it a spark."
- "Move the garden irrigation project to paused."
- "What have I not touched in a while?"

Claude edits the same markdown files you would.

## Running it

```bash
npm install
npm run dev      # local dev server
npm run build    # static build into dist/
```

Requires Node 22.12+.

## Deploying to GitHub Pages

A workflow in `.github/workflows/deploy.yml` builds and deploys on every push to
`main`. Two things to know:

1. **One-time setup:** repo **Settings → Pages → Source → "GitHub Actions"**.
   Until that's set, nothing publishes.
2. Deploys trigger from **`main`**, so changes go live once they reach the
   default branch.

The site is configured for `https://brandonheyer.github.io/log/` (see `site` and
`base` in `astro.config.mjs`).

## Layout

```
content/          ← your markdown (the actual product)
  inbox.md
  ideas/
  projects/
  log/
src/
  content.config.ts   collection schemas
  layouts/            page shell
  pages/              routes
  components/         small UI pieces
  styles/             tokens.css = the whole theming layer
  lib/                url + format helpers
```

## Theming

The visual layer is intentionally minimal for now. Every color, space, and font
is a CSS custom property in `src/styles/tokens.css` — components reference tokens
only, never raw values. Retheming later means editing that one file. Light/dark
already follow your OS setting; a manual toggle can be added without touching
anything else.
```
