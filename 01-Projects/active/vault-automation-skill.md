# Project: Vault Automation Skill

## Status: In Progress

## Overview
Build an Obsidian Skills integration that:
1. Reads RSS feeds
2. Summarizes content  
3. Creates formatted notes in 02-Research/
4. Tags by topic automatically

## Implementation
- Uses Bun for fast execution
- Stores config in `.env`
- Creates daily notes with YAML frontmatter

## Files
- `skill.ts` — main logic
- `adapters/rss.ts` — RSS fetching
- `templates/daily.md` — note template

## Next Steps
- [ ] Test with 3 RSS sources
- [ ] Add error handling
- [ ] Create install script
