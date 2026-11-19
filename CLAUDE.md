# Reppo: project brief

Reppo is Sara's personal gym tracker: an installable web app (PWA), dark and phone-first.
It started as a Claude artifact called "Iron Log" and moved here to become a real phone app.
The goal right now is to get it installed on her Android phone, then onto Google Play.

## Who it's for and how it should feel

- Sara trains **freestyle by feel**, most often back, chest, shoulders and legs, and also runs.
  The app has two halves: **lift** (Train tab) and **recover** (Recover tab).
- Weights are in **kg**. Dates use en-GB format.
- It must work with **no signal** (gyms) and with **no account**. Data lives on the phone.
- User-facing text is plain and direct. Buttons say exactly what happens.

## Commands

- `npm start`: local server at http://localhost:5173 (zero dependencies, `scripts/serve.js`)
- `npm install` then `npm test`: jsdom smoke tests that click through every main flow
- Run `npm test` after every change, and add a test for every new flow.

## Tech

- No framework, no build step, no runtime dependencies. Keep it that way unless there is a clear reason.
- `index.html`: page shell and install tags. `styles.css`: all styles; design tokens live in `:root`
  (single dark theme). `app.js`: the whole app as one classic script with globals.
  `sw.js`: offline service worker. `manifest.webmanifest`: install metadata. `icons/`: app icons.
- Fonts: Big Shoulders Display (headings, numbers) and Instrument Sans (body), from Google Fonts,
  cached by the service worker.

### How app.js works

- Each screen is a function that returns an HTML string: `vStart`, `vActive`, `vRoutine`, `vPlayer`,
  `vRecover`, `vProgress`, `vHistory`, `vMore`, plus `renderSheet` (exercise picker).
  `render()` swaps `main.innerHTML`. Always escape user text with `esc()`.
- One delegated click listener on `document` dispatches on `data-act`. Set inputs use `data-f`.
- `state = { workouts, custom, rest, active }`, saved to localStorage key `reppo.v1` by `saveLocal()`.
- Section comments in app.js, in order: library (`LIB`: `[name, muscle, type]`, type `c` compound or
  `i` isolation), recovery routines (`REC`), bodyweight abs circuit (`ABS`), 4-day plan (`PLAN`),
  stick-figure data (`POSES`) and renderer (`fig()`), Nippard tiers (`TIER`), exercise-to-figure map
  (`FIGMAP`), pure logic, state, derived, render, timer, actions, boot, installable app.

### Workout records (`state.workouts`)

- Lifting: `{ id: "w_<base36 time>", start, end, muscles: [...], plan?: "ua"|"la"|"ub"|"lb", ex: [{ name, sets: [{ w, r }] }] }`
- Guided abs circuit: `{ kind: "abs", name, start, end, n, ex: [] }`, counts as a workout and marks Core trained.
- Recovery or easy movement: `{ kind: "rec", name, start, end, ex: [] }`, excluded from lifting stats and streaks.

### Rules worth knowing

- Progression (`suggest()`): compound lifts aim for 6-10 reps, isolation 10-15. Same weight plus one rep
  until the top of the range, then add 2.5 kg (1 kg below 20 kg). Estimated 1RM uses Epley.
- Muscle rest status on the Train tab: green after 2+ days since that muscle was trained.
- The 4-day plan follows Jeff Nippard's low-volume approach (1-2 hard sets per lift, heavy top set
  plus back-off on main lifts). `TIER` marks his S+ and S tier exercises; the picker has a Top rated filter.
- Figures: `POSES` entries are keyed by stretch name or by a shared base pose like `"@curl"`; `FIGMAP`
  maps each lift to its base pose. Coordinates are in a 120x80 box. Near limbs are light, far limbs grey.
  Props: `wall`, `ln`, `roller`, `wt`, `arc`, `updown`, `box`, `label`, `backwall`. After changing
  figures, render them to a PNG contact sheet and look at it.
- Dormant code: `initCloud()` and `flush()` call `window.claude.use("db")`, which only exists when the
  page runs as a Claude artifact. Here it falls back to local storage ("Saved on this device only").
  Safe to remove, or replace with a real backend.

## Release checklist

1. `npm test` passes.
2. If you added or renamed files, add them to `SHELL` in `sw.js`.
3. Bump `CACHE` in `sw.js` (for example `reppo-v2`) so old caches are cleaned up.
4. Deploy, then open the app on the phone. A new version shows up on the next launch after deploy.

## Roadmap (in priority order)

1. **Deploy and install.** Put the site on HTTPS (GitHub Pages is free), install it on Sara's Android
   phone, and move her existing log in: old Claude version, More, Copy backup; new app, More, paste, Restore.
2. **Safer backups.** The log only lives on the phone, and clearing browser data wipes it. Add
   "Download backup (.json)" and "Restore from file", plus a gentle reminder when the last backup is
   older than 14 days.
3. **Google Play.** Wrap the PWA as a Trusted Web Activity (Bubblewrap or PWABuilder). It needs a
   Digital Asset Links file at `/.well-known/assetlinks.json` on the site's domain root, which is
   easier with a custom domain or a `<username>.github.io` repo than a project subpath. New personal
   Play developer accounts must run a closed test with 12+ testers for 14 days before going public.
4. **Split app.js** into ES modules (data, logic, views) once the tests cover it well.
5. **Figures.** Missing: Pallof Press, Machine Torso Rotation. Weakest drawings: hack squat,
   Bayesian cable curl, overhead triceps extension, 90/90 hip switches, thread the needle, happy baby.
6. **Log a run** so the Recover tab's suggestion reacts to running, not only to lifting.
7. Optional account sync later, only if Sara wants her log on more than one device.
