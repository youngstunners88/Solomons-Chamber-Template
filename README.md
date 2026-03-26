# Solomons Chamber [IMPROVED]

## What's New

### 1. Streamlined Structure
- Clear naming: `YYYY-MM-DD-title.md`
- Auto-routing: Content finds its home
- State tracking: Know what's active

### 2. Smart Routing
```
00-Inbox/          → Auto-sorted by content type
01-Projects/active/
01-Projects/done/  → Completed → archived
02-Research/       → Sources → Insights
03-Trading/signals/
03-Trading/positions/
04-Assets/skills/  → Reusable tools
05-Notes/daily/    → Manual expression
06-Media/          → Voice, video, links
07-Routing/        → Intelligence layer
08-State/          → Status tracking
09-Automation/     → Scheduled tasks
```

### 3. Quick Start
```bash
# 1. Create daily note
bun run scripts/daily-note.ts

# 2. Capture voice
bun run scripts/voice-capture.ts

# 3. Auto-route inbox
bun run 07-Routing/vault-router.ts --process

# 4. Check state
bun run 08-State/state-manager.ts --dashboard
```

### 4. File Conventions
- Notes: `2026-03-26-my-thoughts.md`
- Projects: `PROJ-001-website-redesign.md`
- Research: `SRC-tesla-fsd-v13-analysis.md`
- Signals: `SIG-2026-03-26-btc-long.md`

