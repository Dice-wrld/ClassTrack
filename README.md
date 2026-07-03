# ClassTrack

**Your personal academic command centre — offline-first, no login, no server.**

ClassTrack keeps your class schedule, deadlines, lecture materials, study sessions, exam revision, and notes in one place — all in your browser, all on your device.

---

## Features

| Module | What it does |
|---|---|
| **Timetable** | Day + week view, add/edit/delete classes, conflict detection, live next-class countdown |
| **Attendance** | One-tap mark per class per day, attendance rate per course |
| **Courses** | Course records with credits, instructor, attendance target, linked stats |
| **Deadlines** | Task tracking with urgency badges (Overdue → Due Soon → Later) |
| **Exam Planner** | Revision progress tracking, topic count, difficulty rating |
| **Study / Pomodoro** | Focus timer (25/5/15 min modes), session log with focus score and efficiency |
| **Materials** | Upload slides/notes/PDFs per course and week, in-browser preview |
| **Notes** | Quick typed notes per class, pinnable, searchable |
| **Global Search** | ⌘K across all content types |
| **Backup & Restore** | `.ctbackup` zip includes every uploaded file |
| **PWA** | Install to home screen, works offline once cached |
| **Reminders** | Browser notifications 15 min before class, 24h before deadlines |

---

## Deploy to Netlify in 3 steps

### Option A — Netlify Drop (no account needed)
1. Download or clone this repository
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the entire folder onto the page → live in seconds

### Option B — GitHub + Netlify (recommended — gives you automatic deploys on push)
1. Fork or push this repo to your GitHub account
2. Log in to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Select your repo — Netlify auto-detects `netlify.toml`; no build command needed
4. Click **Deploy** — done

Your site will be live at `https://[your-site-name].netlify.app`.

> The `netlify.toml` in this repo already sets the correct security headers, cache rules, and service worker scope. You don't need to configure anything manually.

---

## Local development

No build step — it's a static HTML file. Just open `index.html` in any modern browser.

For PWA features (offline caching, install prompt, reliable notifications), you need HTTPS. The easiest way to test locally:

```bash
# Python 3
python3 -m http.server 8080
# Then open http://localhost:8080
```

Or use [VS Code Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

---

## File structure

```
/
├── index.html          # The entire application (HTML + CSS + JS, single file)
├── manifest.json       # PWA install metadata
├── sw.js               # Service worker — offline cache + notifications
├── icon-192.png        # App icon
├── icon-512.png        # App icon (large)
├── netlify.toml        # Netlify deploy config (security headers, cache, redirects)
├── _redirects          # Netlify SPA routing fallback
└── README.md           # This file
```

---

## Data & privacy

- Everything is stored locally in your browser (`localStorage` for schedule/settings/metadata, `IndexedDB` for uploaded files)
- Nothing is sent to any server — there is no server
- `.ctbackup` exports are zip files you keep yourself — back them up to Google Drive, email, or a USB stick
- Clearing browser data will erase everything; use Backup before clearing

---

## Tech

Built with vanilla HTML, CSS, and JavaScript — no framework, no build tools, no dependencies except [JSZip](https://stuk.github.io/jszip/) (loaded from CDN for backup/restore only, which requires internet).

Typography: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) + [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) + [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) via Google Fonts.

---

## Licence

MIT — free to use, modify, and distribute. See [LICENSE](./LICENSE) for details.
