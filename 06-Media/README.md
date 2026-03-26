# Media System

Your vault captures **everything** — not just text.

## Folder Structure

```
06-Media/
├── Audio/          # Voice recordings, podcasts, meetings
│   └── 2026-03-26-brainstorm.m4a
├── Transcripts/    # Whisper transcriptions
│   └── 2026-03-26-brainstorm.md
├── Images/         # Screenshots, photos, diagrams
│   └── whiteboard-ideas.png
├── Videos/         # Screen recordings, downloads
│   └── tutorial-demo.mp4
├── Links/          # YouTube, social media, articles
│   └── ai-research-talk.md
└── Generated/      # TTS audio, AI-generated visuals
    └── daily-summary.mp3
```

## Workflows

### Voice Capture → Vault

```bash
# Record or provide audio file
bun scripts/voice-capture.ts --input-file=meeting.m4a

# What happens:
# 1. Audio saved to 06-Media/Audio/
# 2. Whisper transcribes to 06-Media/Transcripts/
# 3. Summary created in 00-Inbox/
# 4. Optional: TTS response generated
```

### Link Capture → Vault

```bash
# Drop any URL
bun scripts/media-link-capture.ts https://youtube.com/watch?v=...

# What happens:
# 1. Source detected (YouTube/Facebook/Instagram/TikTok)
# 2. Metadata extracted (title, author, duration)
# 3. Transcript fetched (if available)
# 4. Entry created in 06-Media/Links/
# 5. Reference added to 00-Inbox/
```

### Image/Video Upload

```bash
# Drag and drop or CLI
mv ~/Downloads/screenshot.png 06-Media/Images/

# Optional: auto-tag and summarize
bun scripts/image-tag.ts 06-Media/Images/screenshot.png
```

## Philosophy

**Capture first, organize later.**

Don't worry about structure when capturing. Dump everything here, let the system organize it.

**Text emerges from media.**

Every media item becomes searchable text:
- Voice → transcript → summary → connections
- Video → transcript → key moments → action items
- Image → OCR → tags → relationships
- Link → metadata → full text → insights

## Privacy

- All media stays local (unless you configure cloud)
- Transcripts are plain text — yours forever
- Links are cached; offline access works

## Integration with Other Layers

```
00-Inbox → Quick review and triage
01-Projects → Link to active work
02-Research → Build knowledge from media
03-Trading → Screen recordings, market analysis
05-Self-Notes → Voice memos become reflections
```

---

**Pro tip:** The `bun scripts/voice-capture.ts --speak` flag creates a true conversational loop: speak → capture → transcribe → AI responds → speaks back.