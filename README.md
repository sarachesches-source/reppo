# Reppo

Gym tracker that lifts by how rested you feel, with guided recovery routines.
An installable web app: it goes on your phone's home screen, opens full screen and works offline.

## Open it in Claude Code

1. Unzip this folder somewhere you keep projects, for example `Documents\reppo`.
2. Open a terminal in that folder and run `claude`, or open the folder in the Claude Code app.
3. Claude Code reads `CLAUDE.md` automatically, so it already knows how the app works and what's next.

A good first request: *"Set up git, push this to a new GitHub repo, and deploy it to GitHub Pages."*

## Run it on your computer

You need Node.js 22 or newer.

```
npm start        # opens the app at http://localhost:5173
npm install      # once, for the tests
npm test         # clicks through every main flow
```

## Put it on your phone

Installing needs the app on a secure (https) web address. GitHub Pages hosts it for free.

1. Push the folder to a GitHub repo, then in the repo go to Settings, Pages, and deploy from the
   `main` branch, root folder. Your address will look like `https://<username>.github.io/reppo/`.
2. **Android:** open that address in Chrome, tap the three-dot menu, then **Install app**
   (or **Add to home screen**).
3. **iPhone:** open it in Safari, tap Share, then **Add to Home Screen**.

## Move your existing log

1. In the old Reppo (the claude.ai link), go to **More** and tap **Copy backup**.
2. In the new app, go to **More**, paste into the box and tap **Restore from pasted backup**.

Your log is stored on the phone only. Copy a backup now and then and keep it somewhere safe.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Page shell and install tags |
| `styles.css` | All styles and colour tokens |
| `app.js` | The whole app: exercises, routines, figures, logic and screens |
| `sw.js` | Offline support |
| `manifest.webmanifest` | App name, icon and colours for installing |
| `icons/` | App icons |
| `scripts/serve.js` | Local server for `npm start` |
| `tests/` | Smoke tests for `npm test` |
| `CLAUDE.md` | Project brief and roadmap for Claude Code |
