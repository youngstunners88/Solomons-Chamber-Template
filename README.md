# Solomons Chamber

**A vault architecture that works WITH Obsidian Skills — or standalone.**

This is not a replacement for Obsidian Skills. It's a file-based foundation that Obsidian Skills (and other automation tools) can plug into.

## Philosophy

- **Manual first, automation optional** — Your vault works without any plugins
- **Text as interface** — Everything is human-readable
- **Automation as enhancement** — Add Obsidian Skills when you want AI assistance
- **Your data stays local** — No cloud lock-in, no subscriptions

## The 8 Layers

```
00-Inbox/           — Capture everything here first
01-Projects/        — Active work (with Obsidian Skills integration)
02-Research/        — Topics, sources, synthesized insights  
03-Trading/         — Market analysis (template, no personal data)
04-Assets/          — Reusable skills, notes, adapters
05-Self-Notes/      — Daily reflections, journal
06-Archive/         — Completed projects
07-Docs/            — How this system works
08-Plugins/         — Obsidian Skills bridge + custom plugins
```

## Quick Start

### Option 1: Manual Only (No Plugins)
1. Fork this repo
2. Start writing in `00-Inbox/`
3. Move completed work to `01-Projects/active/`
4. Archive finished projects to `06-Archive/`

### Option 2: With Obsidian Skills
1. Install [Obsidian Skills](https://github.com/kepano/obsidian-skills)
2. Copy `08-Plugins/obsidian-skills-bridge/skill.yaml` to your Obsidian Skills folder
3. Your vault now has AI assistants that read/write to these folders

## What Makes This Different

|  | Obsidian Skills | Solomons Chamber |
|---|---|---|
| **Type** | Plugin | File architecture |
| **AI** | Built-in | Optional (add when ready) |
| **Data** | Lives in plugin | Lives in your files |
| **Portability** | Obsidian-only | Works with any tool |
| **Philosophy** | AI-first | Human-first |

**Use both:** Install Obsidian Skills *into* this vault structure.

## Trading Module (Optional)

The `03-Trading/` folder contains templates for market analysis — NOT personal trading history.

- `signals/` — Signal detection templates
- `positions/` — Position tracking templates  
- `analysis/` — Market research framework

**To use:** Copy templates, fill with your own analysis. No trades included.

## Real Working Code

See `scripts/` for automation that runs without Obsidian:

- `rss-ingest.ts` — Auto-import RSS feeds to vault
- `daily-note.ts` — Create today's note with template
- `archive-old.ts` — Move stale projects to archive

All scripts write plain markdown. No special formats.

## For Developers

Want to build your own automation?

```typescript
// scripts/custom-skill.ts
import { Vault } from "./lib/vault.ts";

const vault = new Vault("/path/to/Solomons-Chamber");

// Write to any folder
await vault.createNote("02-Research/topics/", "My Research", "# Content...");

// Read existing notes
const insights = await vault.readFolder("02-Research/insights/");
```

See `examples/` for complete working skills.

## License

MIT — Fork it, modify it, make it yours. No attribution required.

## Credits

- Vault architecture: Inspired by zettelkasten + PARA methods
- Obsidian Skills integration: Complementary plugin by @kepano
- Trading templates: Framework only, no financial advice included