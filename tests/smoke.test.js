// End-to-end smoke tests: boot the real app in jsdom and click through each main flow.
// Run with `npm test`. Every test starts from an empty log.
const { test, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const root = path.join(__dirname, "..");
const openWindows = [];
after(() => openWindows.forEach((w) => w.close())); // stop app timers even when a test fails

function boot() {
  const js = fs.readFileSync(path.join(root, "app.js"), "utf8");
  const html = fs
    .readFileSync(path.join(root, "index.html"), "utf8")
    .replace(/<link[^>]*>/g, "")
    .replace('<script src="app.js"></script>', () => "<script>" + js + "</script>");
  const errors = [];
  const dom = new JSDOM(html, {
    runScripts: "dangerously",
    url: "https://reppo.test/",
    pretendToBeVisual: true,
    beforeParse(w) {
      w.localStorage.clear();
      w.addEventListener("error", (e) => errors.push(e.message));
    },
  });
  const w = dom.window;
  openWindows.push(w);
  const d = w.document;
  const $ = (sel) => d.querySelector(sel);
  const $$ = (sel) => [...d.querySelectorAll(sel)];
  const click = (sel) => {
    const el = $(sel);
    assert.ok(el, "missing element: " + sel);
    el.click();
  };
  const type = (sel, value) => {
    const el = $(sel);
    assert.ok(el, "missing element: " + sel);
    el.value = value;
    el.dispatchEvent(new w.Event("input", { bubbles: true }));
  };
  const text = (sel) => ($(sel) || {}).textContent || "";
  const skipToEnd = () => {
    for (let i = 0; i < 80 && $('[data-act="p-next"]'); i++) click('[data-act="p-next"]');
  };
  return { w, d, $, $$, click, type, text, skipToEnd, errors, close: () => w.close() };
}

function logLatPulldown(app, weight, reps) {
  const { click, type } = app;
  click('[data-m="Back"]');
  click('[data-act="start"]');
  click('[data-n="Lat Pulldown"]');
  type("#w-0-0", String(weight));
  type("#r-0-0", String(reps));
  click('[data-act="done"][data-ei="0"][data-si="0"]');
  click('[data-act="finish"]');
}

test("boots on the Train tab with no errors", () => {
  const app = boot();
  assert.equal(app.$$(".muscle").length, 6);
  assert.equal(app.$$('[data-act="plan-start"]').length, 4);
  assert.match(app.text("title"), /Reppo/);
  assert.deepEqual(app.errors, []);
  app.close();
});

test("logs a freestyle workout and suggests the next weight", () => {
  const app = boot();
  logLatPulldown(app, 50, 12);
  assert.match(app.text(".toast"), /Workout saved: 1 set, 600 kg lifted/);
  assert.match(app.text('[data-m="Back"] .pill'), /Trained today/);

  app.click('[data-m="Back"]');
  app.click('[data-act="start"]');
  app.click('[data-n="Lat Pulldown"]');
  assert.match(app.text(".ex .next"), /52\.5 kg × 6/);
  app.click('[data-act="discard"]');
  app.click('[data-act="discard"]');

  const saved = JSON.parse(app.w.localStorage.getItem("reppo.v1"));
  assert.equal(saved.workouts.length, 1);
  assert.deepEqual(app.errors, []);
  app.close();
});

test("progress, history and records fill in after two sessions", () => {
  const app = boot();
  logLatPulldown(app, 50, 10);
  logLatPulldown(app, 55, 10);
  app.click('[data-tab="progress"]');
  assert.ok(app.$("svg.chart"), "1RM chart should render");
  assert.match(app.text("main"), /Personal records/);
  app.click('[data-tab="history"]');
  assert.equal(app.$$(".sess").length, 2);
  assert.ok(app.$(".cal .has"), "calendar should mark workout days");
  assert.deepEqual(app.errors, []);
  app.close();
});

test("plan days load their lifts and rotate to the next day", () => {
  const app = boot();
  app.click('[data-act="plan-start"][data-id="ua"]');
  assert.equal(app.$$(".ex").length, 6);
  assert.equal(app.$$(".ex .exfig svg").length, 6, "every plan lift has a figure");
  app.type("#w-0-0", "60");
  app.type("#r-0-0", "5");
  app.click('[data-act="done"][data-ei="0"][data-si="0"]');
  app.click('[data-act="finish"]');
  assert.match(app.text(".rt.sug b"), /Lower A/);
  assert.deepEqual(app.errors, []);
  app.close();
});

test("gym abs workout preloads four lifts", () => {
  const app = boot();
  app.click('[data-act="abs-gym"]');
  const names = app.$$(".ex h3").map((e) => e.textContent);
  assert.deepEqual(names, ["Cable Crunch", "Hanging Leg Raise", "Decline Sit-Up", "Cable Woodchopper"]);
  assert.deepEqual(app.errors, []);
  app.close();
});

test("bodyweight abs circuit runs to the end and counts as a workout", () => {
  const app = boot();
  app.click('[data-act="rec-open"][data-id="abs"]');
  app.click('[data-act="rec-start"]');
  assert.ok(app.$(".player .figbox svg"), "player shows a figure");
  app.skipToEnd();
  assert.match(app.text(".toast"), /Abs circuit logged/);
  assert.match(app.text('[data-m="Core"] .pill'), /Trained today/);
  assert.deepEqual(app.errors, []);
  app.close();
});

test("recovery routine and easy movement log as recovery", () => {
  const app = boot();
  app.click('[data-tab="recover"]');
  assert.equal(app.$$(".rt").length, 6);
  app.click(".rt.sug");
  app.click('[data-act="rec-start"]');
  app.skipToEnd();
  assert.match(app.text(".toast"), /min of recovery/);
  app.click('[data-act="easy-log"][data-n="Swim"]');
  assert.match(app.text(".toast"), /Swim logged/);
  app.click('[data-tab="history"]');
  assert.equal(app.$$(".sess").length, 2);
  assert.match(app.text(".sess"), /Recovery/);
  assert.deepEqual(app.errors, []);
  app.close();
});

test("exercise library: figures and Nippard top-rated filter", () => {
  const app = boot();
  app.click('[data-act="start"]');
  const rows = app.$$(".pick");
  assert.ok(rows.length >= 80, "library has 80+ exercises");
  const missing = rows.filter((r) => !r.querySelector("svg.fig")).map((r) => r.querySelector("b").textContent);
  assert.deepEqual(missing.sort(), ["Machine Torso Rotation", "Pallof Press"]);
  app.click('[data-act="filter"][data-m="Top rated"]');
  assert.ok(app.$$(".pick").length >= 25, "top-rated filter lists the S/S+ lifts");
  assert.deepEqual(app.errors, []);
  app.close();
});

test("backup copies out of one install and restores into another", () => {
  const a = boot();
  logLatPulldown(a, 40, 8);
  a.click('[data-tab="more"]');
  a.click('[data-act="export"]');
  const backup = a.$("#backup").value;
  assert.match(backup, /"app":"reppo"/);
  a.close();

  const b = boot();
  b.click('[data-tab="more"]');
  b.$("#backup").value = backup;
  b.click('[data-act="import"]');
  assert.match(b.text("#bmsg"), /Restored 1 workout/);
  b.$("#backup").value = "not a backup";
  b.click('[data-act="import"]');
  assert.match(b.text("#bmsg"), /not a valid Reppo backup/);
  assert.deepEqual(b.errors, []);
  b.close();
});

test("progression rule: add reps, then add weight at the top of the range", () => {
  const app = boot();
  const suggest = (sets, type) => {
    const r = app.w.suggest(sets, type);
    return r && { ...r }; // copy out of the jsdom realm so deepEqual compares plain objects
  };
  assert.deepEqual(suggest([{ w: 60, r: 8 }, { w: 60, r: 7 }], "c"), { w: 60, r: 8, why: "Same weight, aim for 8 reps" });
  assert.equal(suggest([{ w: 60, r: 10 }], "c").w, 62.5);
  assert.equal(suggest([{ w: 10, r: 15 }], "i").w, 11);
  assert.equal(suggest([{ w: 0, r: 8 }], "c").r, 9);
  assert.equal(suggest([], "c"), null);
  app.close();
});
