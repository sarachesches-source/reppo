"use strict";
/* ---------- library ---------- */
const MUSCLES = ["Back", "Chest", "Shoulders", "Legs", "Arms", "Core"];
// [name, muscle, type] type c = compound (6-10 reps), i = isolation (10-15 reps)
const LIB = [
  ["Pull-Up", "Back", "c"],
  ["Chin-Up", "Back", "c"],
  ["Lat Pulldown", "Back", "c"],
  ["Barbell Row", "Back", "c"],
  ["Dumbbell Row", "Back", "c"],
  ["Seated Cable Row", "Back", "c"],
  ["T-Bar Row", "Back", "c"],
  ["Chest-Supported Row", "Back", "c"],
  ["Deadlift", "Back", "c"],
  ["Straight-Arm Pulldown", "Back", "i"],
  ["Back Extension", "Back", "i"],
  ["Face Pull", "Back", "i"],
  ["Neutral-Grip Lat Pulldown", "Back", "c"],
  ["One-Arm Lat Pulldown", "Back", "c"],
  ["Meadows Row", "Back", "c"],
  ["Wide-Grip Cable Row", "Back", "c"],
  ["Bench Press", "Chest", "c"],
  ["Incline Bench Press", "Chest", "c"],
  ["Dumbbell Bench Press", "Chest", "c"],
  ["Incline Dumbbell Press", "Chest", "c"],
  ["Machine Chest Press", "Chest", "c"],
  ["Dip", "Chest", "c"],
  ["Push-Up", "Chest", "c"],
  ["Cable Fly", "Chest", "i"],
  ["Pec Deck", "Chest", "i"],
  ["Dumbbell Fly", "Chest", "i"],
  ["Seated Cable Fly", "Chest", "i"],
  ["Overhead Press", "Shoulders", "c"],
  ["Dumbbell Shoulder Press", "Shoulders", "c"],
  ["Machine Shoulder Press", "Shoulders", "c"],
  ["Arnold Press", "Shoulders", "c"],
  ["Lateral Raise", "Shoulders", "i"],
  ["Cable Lateral Raise", "Shoulders", "i"],
  ["Rear Delt Fly", "Shoulders", "i"],
  ["Reverse Pec Deck", "Shoulders", "i"],
  ["Front Raise", "Shoulders", "i"],
  ["Shrug", "Shoulders", "i"],
  ["Cable Y Raise", "Shoulders", "i"],
  ["Behind-the-Back Cable Lateral Raise", "Shoulders", "i"],
  ["Reverse Cable Crossover", "Shoulders", "i"],
  ["Back Squat", "Legs", "c"],
  ["Front Squat", "Legs", "c"],
  ["Leg Press", "Legs", "c"],
  ["Hack Squat", "Legs", "c"],
  ["Romanian Deadlift", "Legs", "c"],
  ["Bulgarian Split Squat", "Legs", "c"],
  ["Walking Lunge", "Legs", "c"],
  ["Hip Thrust", "Legs", "c"],
  ["Goblet Squat", "Legs", "c"],
  ["Leg Extension", "Legs", "i"],
  ["Lying Leg Curl", "Legs", "i"],
  ["Seated Leg Curl", "Legs", "i"],
  ["Standing Calf Raise", "Legs", "i"],
  ["Seated Calf Raise", "Legs", "i"],
  ["Hip Abduction", "Legs", "i"],
  ["Hip Adduction", "Legs", "i"],
  ["Pendulum Squat", "Legs", "c"],
  ["Smith Machine Squat", "Legs", "c"],
  ["Smith Machine Lunge", "Legs", "c"],
  ["Barbell Curl", "Arms", "i"],
  ["Dumbbell Curl", "Arms", "i"],
  ["Hammer Curl", "Arms", "i"],
  ["Incline Dumbbell Curl", "Arms", "i"],
  ["Preacher Curl", "Arms", "i"],
  ["Cable Curl", "Arms", "i"],
  ["Triceps Pushdown", "Arms", "i"],
  ["Overhead Triceps Extension", "Arms", "i"],
  ["Skull Crusher", "Arms", "i"],
  ["Close-Grip Bench Press", "Arms", "c"],
  ["Bayesian Cable Curl", "Arms", "i"],
  ["Machine Preacher Curl", "Arms", "i"],
  ["Preacher Hammer Curl", "Arms", "i"],
  ["Plank", "Core", "i"],
  ["Hanging Leg Raise", "Core", "i"],
  ["Cable Crunch", "Core", "i"],
  ["Ab Wheel Rollout", "Core", "i"],
  ["Russian Twist", "Core", "i"],
  ["Ab Crunch Machine", "Core", "i"],
  ["Decline Sit-Up", "Core", "i"],
  ["Cable Woodchopper", "Core", "i"],
  ["Pallof Press", "Core", "i"],
  ["Captain's Chair Knee Raise", "Core", "i"],
  ["Machine Torso Rotation", "Core", "i"],
];

// Recovery routines. Step: [name, seconds, sides (2 = repeat left and right), cue]
const REC = [
  {
    id: "run",
    name: "After a run",
    tag: "Calves, hamstrings, quads, hips",
    gear: "",
    steps: [
      ["Wall calf stretch", 45, 2, "Hands on a wall, back leg straight, heel pressed down."],
      ["Standing hamstring stretch", 45, 2, "Heel forward, toes up, hinge at the hips with a flat back."],
      ["Standing quad stretch", 45, 2, "Pull your heel to your glute, knees together, hips tucked."],
      ["Low lunge", 60, 2, "Back knee down, sink the hips forward, chest tall."],
      ["Figure-four stretch", 60, 2, "On your back, ankle over the opposite knee, pull the legs in."],
      ["Lying twist", 45, 2, "Knee across your body, both shoulders on the floor."],
      ["Legs up the wall", 120, 1, "Hips close to the wall, arms relaxed, slow breathing."],
    ],
  },
  {
    id: "legs",
    name: "After leg day",
    tag: "Hip flexors, hamstrings, adductors, glutes",
    gear: "",
    steps: [
      ["Couch stretch", 60, 2, "Back shin against a wall or sofa, squeeze the glute, stay upright."],
      ["Lying hamstring stretch", 45, 2, "On your back, pull one straight leg toward you."],
      ["Adductor rock-back", 60, 1, "On all fours, one leg out to the side, rock hips back and forth."],
      ["Pigeon", 60, 2, "Front shin across, back leg long, fold forward as far as is comfortable."],
      ["Wall calf stretch", 45, 2, "Back leg straight, heel pressed down."],
      ["Child's pose", 60, 1, "Knees wide, hips to heels, arms long."],
      ["Legs up the wall", 120, 1, "Let the legs go heavy and breathe slowly."],
    ],
  },
  {
    id: "upper",
    name: "After upper body",
    tag: "Chest, lats, shoulders, upper back",
    gear: "",
    steps: [
      ["Doorway chest stretch", 45, 2, "Forearm on a door frame, elbow at shoulder height, step through."],
      ["Thread the needle", 45, 2, "On all fours, slide one arm under the other and rest the shoulder down."],
      ["Cat-cow", 60, 1, "Round and arch the spine slowly with your breath."],
      ["Child's pose side reach", 30, 2, "Walk both hands to one side to open the lat."],
      ["Cross-body shoulder stretch", 30, 2, "Pull a straight arm across your chest, shoulder down."],
      ["Overhead triceps stretch", 30, 2, "Elbow to the ceiling, gently pull it behind your head."],
      ["Puppy pose", 60, 1, "Hips over knees, chest sinking toward the floor, arms long."],
      ["Wall slides", 60, 1, "Back to a wall, slide your arms up and down, ribs down."],
    ],
  },
  {
    id: "hips",
    name: "Hips and ankles mobility",
    tag: "Looser stride and deeper squat",
    gear: "",
    steps: [
      ["90/90 hip switches", 90, 1, "Sit with both knees bent at 90 degrees and rotate side to side."],
      [
        "World's greatest stretch",
        60,
        2,
        "Deep lunge, elbow to the instep, then rotate the arm to the ceiling.",
      ],
      ["Deep squat hold", 60, 1, "Heels down, elbows pushing the knees out, chest up."],
      [
        "Knee-to-wall ankle rocks",
        45,
        2,
        "Foot a hand-width from the wall, drive the knee forward, heel down.",
      ],
      ["Cossack squat", 60, 1, "Shift side to side, one leg bent, the other straight."],
      ["Hip circles on all fours", 30, 2, "Draw big slow circles with one knee."],
      ["Pigeon", 60, 2, "Front shin across, back leg long."],
    ],
  },
  {
    id: "roll",
    name: "Foam roll flush",
    tag: "Slow passes on tired legs and back",
    gear: "Foam roller",
    steps: [
      ["Calves", 45, 2, "Roll slowly from ankle to below the knee."],
      ["Hamstrings", 45, 2, "Hands behind you, roll from knee to glute."],
      ["Quads", 60, 2, "Face down on your forearms, roll from hip to above the knee."],
      ["Glutes", 45, 2, "Sit on the roller, ankle over the opposite knee, lean into that side."],
      ["Upper back", 60, 1, "Roller under the shoulder blades, hands behind the head, small passes."],
      ["Lats", 45, 2, "Lie on your side, roller under the armpit, arm overhead."],
    ],
  },
  {
    id: "unwind",
    name: "Full-body unwind",
    tag: "Rest day or evening wind-down",
    gear: "",
    steps: [
      ["Cat-cow", 60, 1, "Round and arch the spine slowly with your breath."],
      ["Downward dog", 60, 1, "Hips high, pedal the heels one at a time."],
      ["Low lunge with twist", 45, 2, "Back knee down, rotate your chest toward the front leg."],
      ["Half split", 45, 2, "From kneeling, straighten the front leg and fold over it."],
      ["Pigeon", 60, 2, "Front shin across, back leg long."],
      ["Lying twist", 45, 2, "Knee across your body, both shoulders down."],
      ["Happy baby", 60, 1, "On your back, hold your feet, knees toward the armpits."],
      ["Box breathing", 120, 1, "Lie flat. In for 4, hold 4, out for 4, hold 4."],
    ],
  },
];
const ABS = {
  id: "abs",
  kind: "abs",
  tab: "train",
  name: "Abs circuit",
  tag: "Core · no equipment",
  gear: "",
  rounds: 2,
  rest: 20,
  steps: [
    [
      "Dead bug",
      40,
      1,
      "Lower back pressed into the floor. Lower the opposite arm and leg slowly, then switch.",
    ],
    [
      "Bicycle crunch",
      40,
      1,
      "Shoulders off the floor, elbow toward the opposite knee, slow and controlled.",
    ],
    ["Plank", 40, 1, "Elbows under shoulders, glutes tight, straight line from head to heels."],
    ["Reverse crunch", 40, 1, "Curl your hips off the floor using your abs. Lower without swinging."],
    ["Russian twist", 40, 1, "Lean back with a long spine and rotate your chest side to side."],
    ["Side plank", 30, 2, "Elbow under shoulder, hips high, body in one straight line."],
    [
      "Hollow hold",
      30,
      1,
      "Lower back glued to the floor, arms and legs long. Bend the knees to make it easier.",
    ],
  ],
};
// 4-day low-volume plan: [exercise, sets, target]
const PLAN = [
  {
    id: "ua",
    name: "Upper A",
    tag: "Chest and back strength",
    ex: [
      ["Machine Chest Press", 2, "Set 1 heavy, 4-6 reps. Set 2 lighter, 8-10 reps, to failure."],
      ["Lat Pulldown", 2, "10-12 reps. Wide grip, full stretch at the top."],
      ["Seated Cable Row", 2, "10-12 reps. Pair with the pulldown to save time."],
      ["Cable Lateral Raise", 2, "12-15 reps. Drop the weight 30-40% after the last set and go again."],
      ["Overhead Triceps Extension", 1, "12-15 reps to failure, then one drop set."],
      ["Preacher Curl", 1, "10-12 reps to failure, then one drop set."],
    ],
  },
  {
    id: "la",
    name: "Lower A",
    tag: "Quads first",
    ex: [
      ["Hack Squat", 2, "Set 1 heavy, 4-6 reps. Set 2 lighter, 8-10 reps."],
      ["Romanian Deadlift", 2, "8-10 reps. Stop one rep short of failure."],
      ["Seated Leg Curl", 1, "10-12 reps to failure, then one drop set."],
      ["Leg Extension", 1, "12-15 reps to failure, then one drop set."],
      ["Standing Calf Raise", 2, "10-15 reps. Pause in the stretch."],
      ["Cable Crunch", 2, "12-15 reps. Drop set after the last one."],
    ],
  },
  {
    id: "ub",
    name: "Upper B",
    tag: "Shoulders and back width",
    ex: [
      ["Incline Dumbbell Press", 2, "8-10 reps. Alternate with the row, 30-60 s between."],
      ["Chest-Supported Row", 2, "10-12 reps. Alternate with the press."],
      ["Machine Shoulder Press", 2, "8-10 reps, last set to failure."],
      ["Pull-Up", 2, "6-10 reps. Use the pulldown if you cannot reach 6."],
      ["Reverse Pec Deck", 2, "12-15 reps. Drop set after the last one."],
      ["Seated Cable Fly", 1, "12-15 reps to failure. Deep stretch."],
      ["Bayesian Cable Curl", 1, "10-12 reps. Pair with the pushdown."],
      ["Triceps Pushdown", 1, "10-12 reps to failure."],
    ],
  },
  {
    id: "lb",
    name: "Lower B",
    tag: "Hamstrings and glutes first",
    ex: [
      ["Bulgarian Split Squat", 2, "8-10 reps per leg. Stop one rep short of failure."],
      ["Leg Press", 2, "10-12 reps, last set to failure."],
      ["Back Extension", 2, "10-12 reps. Hold a plate once 12 is easy."],
      ["Lying Leg Curl", 2, "10-12 reps. Drop set after the last one."],
      ["Hip Abduction", 1, "12-15 reps to failure, then one drop set."],
      ["Hanging Leg Raise", 2, "As many clean reps as you can."],
    ],
  },
];
function planNext() {
  for (let i = state.workouts.length - 1; i >= 0; i--) {
    const k = PLAN.findIndex((d) => d.id === state.workouts[i].plan);
    if (k >= 0) return PLAN[(k + 1) % PLAN.length].id;
  }
  return PLAN[0].id;
}
const ABSGYM = ["Cable Crunch", "Hanging Leg Raise", "Decline Sit-Up", "Cable Woodchopper"];
const routine = (id) => (id === "abs" ? ABS : REC.find((x) => x.id === id));
const EASY = ["Easy walk", "Easy bike", "Swim", "Yoga"];
function recSteps(r) {
  const one = r.steps.map((s) =>
    s[2] === 2
      ? [
          { n: s[0], side: "Left side", sec: s[1], cue: s[3] },
          { n: s[0], side: "Right side", sec: s[1], cue: s[3] },
        ]
      : [{ n: s[0], side: "", sec: s[1], cue: s[3] }],
  );
  if (!r.rest) return one.flat();
  const out = [];
  for (let k = 1; k <= (r.rounds || 1); k++)
    one.forEach((g, i) => {
      g.forEach((x) => out.push(Object.assign({ round: k }, x)));
      const last = k === (r.rounds || 1) && i === one.length - 1;
      if (!last) {
        const nx = one[(i + 1) % one.length][0];
        out.push({
          n: "Rest",
          rest: true,
          side: "",
          sec: r.rest,
          cue: "Shake it out. " + nx.n + " is next.",
          fig: nx.n,
          round: k,
        });
      }
    });
  return out;
}
const recMins = (r) => Math.round(recSteps(r).reduce((a, s) => a + s.sec, 0) / 60);

// Pose: h head, s shoulders, p pelvis, c optional spine curve point; a1/l1 near limbs, a2/l2 far limbs (points after s or p); x props
const POSES = {
  "Wall calf stretch": {
    h: [77, 13],
    s: [72, 21],
    p: [58, 42],
    a1: [
      [84, 22],
      [98, 19],
    ],
    a2: [
      [84, 26],
      [98, 25],
    ],
    l1: [
      [72, 54],
      [70, 70],
      [77, 70],
    ],
    l2: [
      [45, 56],
      [33, 70],
      [40, 70],
    ],
    x: [["wall", 100]],
  },
  "Standing hamstring stretch": {
    h: [74, 31],
    s: [66, 34],
    p: [46, 40],
    a1: [
      [72, 44],
      [76, 55],
    ],
    l1: [
      [60, 55],
      [74, 70],
      [77, 63],
    ],
    l2: [
      [49, 55],
      [44, 70],
      [51, 70],
    ],
  },
  "Standing quad stretch": {
    h: [60, 9],
    s: [60, 18],
    p: [60, 41],
    a2: [
      [70, 24],
      [80, 19],
    ],
    a1: [
      [51, 30],
      [44, 46],
    ],
    l2: [
      [60, 56],
      [60, 70],
      [67, 70],
    ],
    l1: [
      [57, 57],
      [44, 48],
    ],
  },
  "Low lunge": {
    h: [61, 15],
    s: [60, 24],
    p: [57, 48],
    a1: [
      [66, 35],
      [73, 47],
    ],
    l1: [
      [75, 51],
      [75, 70],
      [82, 70],
    ],
    l2: [
      [41, 68],
      [24, 69],
    ],
  },
  "Figure-four stretch": {
    h: [20, 63],
    s: [28, 65],
    p: [54, 65],
    a1: [
      [42, 57],
      [58, 50],
    ],
    l1: [
      [62, 47],
      [78, 50],
    ],
    l2: [
      [72, 58],
      [64, 46],
    ],
  },
  "Lying twist": {
    h: [20, 63],
    s: [28, 65],
    p: [54, 65],
    a1: [
      [30, 54],
      [31, 44],
    ],
    l1: [
      [66, 51],
      [78, 64],
    ],
    l2: [
      [72, 66],
      [92, 67],
    ],
    x: [["arc", 70, 46, 1]],
  },
  "Legs up the wall": {
    h: [52, 63],
    s: [60, 66],
    p: [88, 66],
    a1: [
      [70, 69],
      [80, 69],
    ],
    l1: [
      [91, 49],
      [92, 32],
    ],
    l2: [
      [88, 49],
      [88, 33],
    ],
    x: [["wall", 97]],
  },
  "Couch stretch": {
    h: [47, 17],
    s: [46, 26],
    p: [44, 50],
    a1: [
      [53, 38],
      [61, 49],
    ],
    l1: [
      [62, 52],
      [62, 70],
      [69, 70],
    ],
    l2: [
      [30, 68],
      [25, 50],
    ],
    x: [["wall", 21]],
  },
  "Lying hamstring stretch": {
    h: [20, 63],
    s: [28, 65],
    p: [54, 65],
    a1: [
      [42, 56],
      [56, 45],
    ],
    l1: [
      [57, 48],
      [58, 31],
    ],
    l2: [
      [72, 66],
      [92, 67],
    ],
  },
  "Adductor rock-back": {
    h: [58, 31],
    s: [58, 40],
    p: [58, 52],
    a1: [
      [53, 55],
      [51, 69],
    ],
    a2: [
      [64, 55],
      [66, 69],
    ],
    l1: [
      [52, 68],
      [48, 69],
    ],
    l2: [
      [80, 61],
      [100, 69],
    ],
    x: [["label", "front view"]],
  },
  Pigeon: {
    h: [61, 29],
    s: [60, 38],
    p: [54, 60],
    a1: [
      [67, 50],
      [71, 68],
    ],
    l1: [
      [71, 66],
      [58, 69],
    ],
    l2: [
      [36, 67],
      [18, 69],
    ],
  },
  "Child's pose": {
    h: [72, 63],
    s: [64, 58],
    p: [40, 56],
    c: [52, 45],
    a1: [
      [79, 66],
      [95, 68],
    ],
    l1: [
      [60, 69],
      [36, 69],
    ],
  },
  "Doorway chest stretch": {
    h: [63, 13],
    s: [62, 22],
    p: [60, 45],
    a1: [
      [73, 22],
      [73, 9],
    ],
    a2: [
      [58, 34],
      [60, 44],
    ],
    l1: [
      [68, 57],
      [70, 70],
      [77, 70],
    ],
    l2: [
      [54, 58],
      [48, 70],
      [55, 70],
    ],
    x: [["wall", 75]],
  },
  "Thread the needle": {
    h: [76, 65],
    s: [68, 61],
    p: [44, 48],
    a1: [
      [58, 68],
      [48, 66],
    ],
    a2: [
      [79, 53],
      [81, 69],
    ],
    l1: [
      [44, 69],
      [26, 69],
    ],
  },
  "Cat-cow": {
    h: [81, 56],
    s: [72, 49],
    p: [44, 49],
    c: [58, 34],
    a1: [
      [72, 59],
      [72, 69],
    ],
    l1: [
      [44, 69],
      [26, 69],
    ],
    x: [["arc", 58, 24, 1]],
  },
  "Child's pose side reach": {
    h: [72, 63],
    s: [64, 58],
    p: [40, 56],
    c: [52, 45],
    a1: [
      [79, 63],
      [95, 60],
    ],
    a2: [
      [79, 66],
      [94, 68],
    ],
    l1: [
      [60, 69],
      [36, 69],
    ],
    x: [["arc", 94, 48, 1]],
  },
  "Cross-body shoulder stretch": {
    h: [60, 14],
    s: [60, 25],
    p: [60, 48],
    a1: [
      [50, 26],
      [38, 26],
    ],
    a2: [
      [52, 36],
      [46, 27],
    ],
    l1: [
      [56, 60],
      [54, 70],
    ],
    l2: [
      [64, 60],
      [66, 70],
    ],
    x: [["label", "front view"]],
  },
  "Overhead triceps stretch": {
    h: [60, 16],
    s: [60, 26],
    p: [60, 48],
    a1: [
      [68, 9],
      [62, 22],
    ],
    a2: [
      [52, 12],
      [67, 8],
    ],
    l1: [
      [56, 60],
      [54, 70],
    ],
    l2: [
      [64, 60],
      [66, 70],
    ],
    x: [["label", "front view"]],
  },
  "Puppy pose": {
    h: [75, 65],
    s: [68, 61],
    p: [44, 48],
    a1: [
      [81, 66],
      [95, 68],
    ],
    l1: [
      [44, 69],
      [26, 69],
    ],
  },
  "Wall slides": {
    h: [60, 15],
    s: [60, 25],
    p: [60, 48],
    a1: [
      [73, 25],
      [73, 12],
    ],
    a2: [
      [47, 25],
      [47, 12],
    ],
    l1: [
      [56, 60],
      [54, 70],
    ],
    l2: [
      [64, 60],
      [66, 70],
    ],
    x: [["backwall"], ["updown", 86, 18]],
  },
  "90/90 hip switches": {
    h: [56, 29],
    s: [56, 38],
    p: [56, 63],
    a1: [
      [62, 50],
      [70, 60],
    ],
    l1: [
      [75, 66],
      [64, 69],
    ],
    l2: [
      [42, 68],
      [27, 60],
    ],
  },
  "World's greatest stretch": {
    h: [78, 37],
    s: [70, 42],
    p: [52, 52],
    a1: [
      [69, 56],
      [66, 69],
    ],
    a2: [
      [70, 28],
      [70, 13],
    ],
    l1: [
      [73, 52],
      [73, 70],
      [80, 70],
    ],
    l2: [
      [35, 61],
      [17, 69],
    ],
  },
  "Deep squat hold": {
    h: [62, 29],
    s: [60, 38],
    p: [50, 60],
    a1: [
      [68, 47],
      [75, 42],
    ],
    l1: [
      [70, 52],
      [62, 70],
      [69, 70],
    ],
  },
  "Knee-to-wall ankle rocks": {
    h: [75, 20],
    s: [74, 29],
    p: [72, 53],
    a1: [
      [84, 31],
      [95, 31],
    ],
    l1: [
      [94, 55],
      [84, 70],
      [91, 70],
    ],
    l2: [
      [62, 69],
      [45, 69],
    ],
    x: [["wall", 97]],
  },
  "Cossack squat": {
    h: [52, 26],
    s: [52, 35],
    p: [52, 56],
    a1: [
      [58, 42],
      [63, 37],
    ],
    l1: [
      [38, 53],
      [44, 70],
    ],
    l2: [
      [72, 62],
      [93, 69],
    ],
    x: [["label", "front view"]],
  },
  "Hip circles on all fours": {
    h: [81, 45],
    s: [72, 49],
    p: [44, 49],
    a1: [
      [72, 59],
      [72, 69],
    ],
    l1: [
      [44, 69],
      [26, 69],
    ],
    l2: [
      [31, 43],
      [27, 56],
    ],
    x: [["arc", 26, 34, 1]],
  },
  Calves: {
    h: [35, 33],
    s: [38, 42],
    p: [47, 62],
    a1: [
      [32, 55],
      [30, 69],
    ],
    l1: [
      [65, 60],
      [86, 58],
    ],
    x: [["roller", 79, 65]],
  },
  Hamstrings: {
    h: [35, 31],
    s: [38, 40],
    p: [46, 58],
    a1: [
      [32, 54],
      [30, 69],
    ],
    l1: [
      [66, 58],
      [87, 61],
    ],
    x: [["roller", 58, 65]],
  },
  Quads: {
    h: [93, 49],
    s: [84, 54],
    p: [57, 56],
    a1: [
      [84, 65],
      [95, 68],
    ],
    l1: [
      [40, 58],
      [21, 63],
    ],
    x: [["roller", 46, 65]],
  },
  Glutes: {
    h: [43, 27],
    s: [44, 36],
    p: [50, 57],
    a1: [
      [38, 50],
      [36, 69],
    ],
    l1: [
      [66, 47],
      [72, 69],
    ],
    l2: [
      [63, 53],
      [69, 44],
    ],
    x: [["roller", 50, 65]],
  },
  "Upper back": {
    h: [33, 53],
    s: [42, 56],
    p: [63, 62],
    a1: [
      [38, 46],
      [31, 49],
    ],
    l1: [
      [77, 48],
      [83, 69],
    ],
    x: [["roller", 44, 64]],
  },
  Lats: {
    h: [30, 53],
    s: [40, 57],
    p: [66, 63],
    a1: [
      [28, 61],
      [15, 64],
    ],
    l1: [
      [83, 66],
      [99, 68],
    ],
    l2: [
      [77, 53],
      [81, 69],
    ],
    x: [["roller", 42, 64]],
  },
  "Downward dog": {
    h: [79, 61],
    s: [75, 53],
    p: [54, 27],
    a1: [
      [82, 61],
      [88, 69],
    ],
    l1: [
      [42, 48],
      [29, 69],
    ],
  },
  "Low lunge with twist": {
    h: [61, 15],
    s: [60, 24],
    p: [57, 48],
    a1: [
      [66, 35],
      [73, 47],
    ],
    a2: [
      [51, 16],
      [45, 6],
    ],
    l1: [
      [75, 51],
      [75, 70],
      [82, 70],
    ],
    l2: [
      [41, 68],
      [24, 69],
    ],
    x: [["arc", 36, 14, -1]],
  },
  "Half split": {
    h: [72, 41],
    s: [64, 43],
    p: [44, 50],
    a1: [
      [68, 56],
      [70, 69],
    ],
    l1: [
      [62, 60],
      [81, 69],
      [83, 62],
    ],
    l2: [
      [44, 69],
      [26, 69],
    ],
  },
  "Happy baby": {
    h: [24, 63],
    s: [32, 65],
    p: [58, 65],
    a1: [
      [42, 54],
      [50, 38],
    ],
    a2: [
      [46, 56],
      [57, 40],
    ],
    l1: [
      [46, 52],
      [50, 36],
    ],
    l2: [
      [51, 54],
      [57, 38],
    ],
  },
  Plank: {
    h: [93, 47],
    s: [84, 53],
    p: [56, 58],
    a1: [
      [84, 66],
      [96, 68],
    ],
    l1: [
      [38, 63],
      [20, 68],
    ],
  },
  "Dead bug": {
    h: [30, 63],
    s: [38, 65],
    p: [64, 65],
    a1: [
      [25, 57],
      [13, 52],
    ],
    a2: [
      [39, 53],
      [39, 42],
    ],
    l1: [
      [81, 62],
      [99, 58],
    ],
    l2: [
      [64, 48],
      [81, 48],
    ],
  },
  "Bicycle crunch": {
    h: [35, 53],
    s: [43, 60],
    p: [64, 66],
    a1: [
      [50, 50],
      [39, 51],
    ],
    l1: [
      [55, 50],
      [68, 45],
    ],
    l2: [
      [81, 63],
      [99, 59],
    ],
    x: [["arc", 52, 36, 1]],
  },
  "Reverse crunch": {
    h: [24, 63],
    s: [32, 65],
    p: [58, 60],
    a1: [
      [44, 69],
      [56, 69],
    ],
    l1: [
      [53, 44],
      [68, 40],
    ],
    x: [["arc", 58, 28, -1]],
  },
  "Russian twist": {
    h: [36, 35],
    s: [40, 44],
    p: [54, 66],
    a1: [
      [51, 49],
      [60, 54],
    ],
    l1: [
      [70, 52],
      [85, 60],
    ],
    x: [["arc", 60, 38, 1]],
  },
  "Side plank": {
    h: [26, 36],
    s: [34, 45],
    p: [58, 56],
    a1: [
      [34, 68],
      [45, 69],
    ],
    a2: [
      [35, 33],
      [36, 21],
    ],
    l1: [
      [78, 64],
      [97, 70],
    ],
  },
  "Hollow hold": {
    h: [24, 55],
    s: [32, 60],
    p: [58, 66],
    a1: [
      [22, 50],
      [11, 44],
    ],
    l1: [
      [77, 61],
      [95, 53],
    ],
  },
  "Cable Crunch": {
    h: [70, 45],
    s: [62, 40],
    p: [46, 52],
    a1: [
      [71, 51],
      [73, 40],
    ],
    l1: [
      [50, 69],
      [32, 69],
    ],
    x: [
      ["wall", 104],
      ["ln", 73, 40, 104, 8],
      ["arc", 58, 26, 1],
    ],
  },
  "Hanging Leg Raise": {
    h: [62, 17],
    s: [60, 24],
    p: [60, 46],
    a1: [
      [60, 15],
      [60, 7],
    ],
    l1: [
      [76, 46],
      [93, 45],
    ],
    x: [
      ["ln", 40, 6, 82, 6],
      ["arc", 92, 32, -1],
    ],
  },
  "Decline Sit-Up": {
    h: [36, 31],
    s: [40, 40],
    p: [52, 57],
    a1: [
      [47, 45],
      [42, 49],
    ],
    l1: [
      [70, 41],
      [85, 43],
    ],
    x: [
      ["ln", 28, 68, 92, 40],
      ["arc", 28, 24, 1],
    ],
  },
  "Cable Woodchopper": {
    h: [61, 13],
    s: [60, 23],
    p: [60, 45],
    a1: [
      [51, 17],
      [42, 13],
    ],
    a2: [
      [50, 21],
      [42, 15],
    ],
    l1: [
      [66, 58],
      [68, 70],
    ],
    l2: [
      [54, 58],
      [52, 70],
    ],
    x: [
      ["wall", 16],
      ["ln", 42, 13, 16, 5],
      ["arc", 80, 34, 1],
    ],
  },
  "Ab Wheel Rollout": {
    h: [82, 57],
    s: [74, 55],
    p: [48, 54],
    a1: [
      [85, 61],
      [95, 65],
    ],
    l1: [
      [40, 69],
      [24, 65],
    ],
    x: [["roller", 97, 65]],
  },
  "Ab Crunch Machine": {
    h: [66, 24],
    s: [60, 30],
    p: [50, 52],
    a1: [
      [68, 36],
      [72, 28],
    ],
    l1: [
      [68, 52],
      [68, 70],
    ],
    x: [
      ["ln", 44, 20, 44, 56],
      ["ln", 44, 56, 56, 56],
      ["arc", 76, 16, 1],
    ],
  },
  "@pullup": {
    h: [61, 12],
    s: [60, 21],
    p: [60, 45],
    a1: [
      [69, 19],
      [64, 7],
    ],
    a2: [
      [51, 19],
      [56, 7],
    ],
    l1: [
      [61, 58],
      [52, 66],
    ],
    x: [
      ["ln", 38, 6, 84, 6],
      ["updown", 92, 24],
    ],
  },
  "@pulldown": {
    h: [55, 24],
    s: [56, 33],
    p: [58, 57],
    a1: [
      [65, 24],
      [66, 13],
    ],
    a2: [
      [49, 24],
      [48, 13],
    ],
    l1: [
      [73, 57],
      [73, 72],
    ],
    x: [
      ["ln", 48, 59, 66, 59],
      ["ln", 40, 13, 76, 13],
      ["ln", 58, 13, 58, 2],
      ["updown", 90, 24],
    ],
  },
  "@bentrow": {
    h: [76, 30],
    s: [68, 34],
    p: [46, 41],
    a1: [
      [72, 44],
      [66, 50],
    ],
    l1: [
      [53, 57],
      [49, 72],
      [56, 72],
    ],
    x: [
      ["wt", 66, 53],
      ["updown", 84, 48],
    ],
  },
  "@row": {
    h: [51, 25],
    s: [50, 34],
    p: [50, 57],
    a1: [
      [56, 44],
      [67, 42],
    ],
    l1: [
      [66, 52],
      [81, 58],
    ],
    x: [
      ["ln", 34, 60, 62, 60],
      ["ln", 83, 48, 83, 68],
      ["ln", 67, 42, 106, 42],
      ["wall", 106],
    ],
  },
  "@chestrow": {
    h: [73, 27],
    s: [66, 34],
    p: [50, 54],
    a1: [
      [72, 43],
      [69, 53],
    ],
    l1: [
      [41, 62],
      [35, 72],
    ],
    x: [
      ["ln", 42, 62, 72, 28],
      ["wt", 69, 56],
      ["updown", 86, 46],
    ],
  },
  "@deadlift": {
    h: [74, 29],
    s: [66, 33],
    p: [46, 43],
    a1: [
      [66, 45],
      [65, 57],
    ],
    l1: [
      [55, 57],
      [52, 72],
      [59, 72],
    ],
    x: [["roller", 65, 61]],
  },
  "@backext": {
    h: [87, 41],
    s: [78, 43],
    p: [56, 47],
    a1: [
      [74, 50],
      [69, 46],
    ],
    l1: [
      [45, 59],
      [35, 71],
    ],
    x: [
      ["ln", 42, 64, 60, 48],
      ["arc", 84, 28, -1],
    ],
  },
  "@facepull": {
    h: [57, 15],
    s: [56, 25],
    p: [56, 49],
    a1: [
      [67, 21],
      [65, 15],
    ],
    l1: [
      [63, 61],
      [66, 72],
    ],
    l2: [
      [50, 61],
      [46, 72],
    ],
    x: [
      ["wall", 104],
      ["ln", 65, 15, 104, 15],
    ],
  },
  "@bench": {
    h: [35, 51],
    s: [44, 54],
    p: [70, 55],
    a1: [
      [45, 42],
      [45, 30],
    ],
    l1: [
      [85, 58],
      [86, 72],
    ],
    x: [
      ["ln", 28, 58, 80, 58],
      ["ln", 36, 58, 36, 72],
      ["ln", 74, 58, 74, 72],
      ["wt", 45, 27],
      ["updown", 60, 34],
    ],
  },
  "@incline": {
    h: [61, 27],
    s: [56, 36],
    p: [46, 58],
    a1: [
      [65, 27],
      [71, 17],
    ],
    l1: [
      [64, 60],
      [66, 72],
    ],
    x: [
      ["ln", 40, 62, 58, 30],
      ["ln", 40, 62, 60, 62],
      ["wt", 72, 14],
    ],
  },
  "@machinepress": {
    h: [49, 23],
    s: [48, 32],
    p: [48, 56],
    a1: [
      [58, 35],
      [70, 34],
    ],
    l1: [
      [64, 56],
      [64, 72],
    ],
    x: [
      ["ln", 42, 22, 42, 58],
      ["ln", 42, 58, 56, 58],
      ["ln", 70, 27, 70, 41],
      ["arc", 84, 24, 1],
    ],
  },
  "@dip": {
    h: [60, 13],
    s: [60, 23],
    p: [61, 47],
    a1: [
      [52, 32],
      [60, 40],
    ],
    l1: [
      [62, 60],
      [52, 67],
    ],
    x: [
      ["ln", 44, 40, 76, 40],
      ["ln", 46, 40, 46, 72],
      ["ln", 74, 40, 74, 72],
      ["updown", 90, 30],
    ],
  },
  "@pushup": {
    h: [91, 41],
    s: [82, 48],
    p: [56, 56],
    a1: [
      [82, 60],
      [82, 71],
    ],
    l1: [
      [38, 62],
      [20, 70],
    ],
    x: [["updown", 100, 56]],
  },
  "@fly": {
    h: [60, 16],
    s: [60, 27],
    p: [60, 52],
    a1: [
      [74, 30],
      [88, 26],
    ],
    a2: [
      [46, 30],
      [32, 26],
    ],
    l1: [
      [66, 61],
      [68, 72],
    ],
    l2: [
      [54, 61],
      [52, 72],
    ],
    x: [
      ["ln", 88, 26, 108, 14],
      ["ln", 32, 26, 12, 14],
      ["label", "front view"],
      ["arc", 60, 40, 1],
    ],
  },
  "@rearfly": {
    h: [60, 16],
    s: [60, 27],
    p: [60, 52],
    a1: [
      [75, 28],
      [90, 27],
    ],
    a2: [
      [45, 28],
      [30, 27],
    ],
    l1: [
      [66, 61],
      [68, 72],
    ],
    l2: [
      [54, 61],
      [52, 72],
    ],
    x: [
      ["wt", 92, 27],
      ["wt", 28, 27],
      ["label", "arms sweep back"],
    ],
  },
  "@ohp": {
    h: [60, 20],
    s: [60, 30],
    p: [60, 52],
    a1: [
      [71, 23],
      [71, 11],
    ],
    a2: [
      [49, 23],
      [49, 11],
    ],
    l1: [
      [65, 62],
      [67, 72],
    ],
    l2: [
      [55, 62],
      [53, 72],
    ],
    x: [
      ["wt", 71, 8],
      ["wt", 49, 8],
      ["label", "front view"],
      ["updown", 92, 20],
    ],
  },
  "@latraise": {
    h: [60, 16],
    s: [60, 27],
    p: [60, 52],
    a1: [
      [73, 28],
      [87, 27],
    ],
    a2: [
      [47, 28],
      [33, 27],
    ],
    l1: [
      [65, 62],
      [67, 72],
    ],
    l2: [
      [55, 62],
      [53, 72],
    ],
    x: [
      ["wt", 90, 27],
      ["wt", 30, 27],
      ["label", "front view"],
      ["updown", 102, 40],
    ],
  },
  "@frontraise": {
    h: [60, 15],
    s: [60, 25],
    p: [60, 49],
    a1: [
      [72, 25],
      [84, 24],
    ],
    l1: [
      [60, 61],
      [60, 72],
      [66, 72],
    ],
    x: [
      ["wt", 87, 24],
      ["arc", 84, 38, -1],
    ],
  },
  "@shrug": {
    h: [60, 17],
    s: [60, 27],
    p: [60, 52],
    a1: [
      [69, 38],
      [70, 50],
    ],
    a2: [
      [51, 38],
      [50, 50],
    ],
    l1: [
      [65, 62],
      [67, 72],
    ],
    l2: [
      [55, 62],
      [53, 72],
    ],
    x: [
      ["wt", 70, 53],
      ["wt", 50, 53],
      ["label", "front view"],
      ["updown", 88, 24],
    ],
  },
  "@squat": {
    h: [63, 22],
    s: [58, 31],
    p: [47, 52],
    a1: [
      [53, 37],
      [56, 29],
    ],
    l1: [
      [66, 51],
      [58, 72],
      [65, 72],
    ],
    x: [
      ["roller", 55, 27],
      ["updown", 86, 44],
    ],
  },
  "@hack": {
    h: [66, 23],
    s: [61, 32],
    p: [50, 52],
    a1: [
      [67, 38],
      [63, 30],
    ],
    l1: [
      [69, 50],
      [78, 64],
    ],
    x: [
      ["ln", 32, 70, 68, 16],
      ["ln", 72, 72, 88, 58],
      ["updown", 98, 36],
    ],
  },
  "@legpress": {
    h: [25, 38],
    s: [30, 46],
    p: [44, 60],
    a1: [
      [38, 56],
      [46, 62],
    ],
    l1: [
      [58, 47],
      [70, 40],
    ],
    x: [
      ["ln", 22, 52, 46, 65],
      ["ln", 66, 29, 78, 49],
      ["arc", 86, 30, 1],
    ],
  },
  "@bss": {
    h: [56, 12],
    s: [56, 22],
    p: [56, 46],
    a1: [
      [58, 35],
      [58, 47],
    ],
    l1: [
      [72, 49],
      [72, 72],
      [79, 72],
    ],
    l2: [
      [44, 62],
      [30, 58],
    ],
    x: [
      ["ln", 18, 60, 36, 60],
      ["ln", 22, 60, 22, 72],
      ["wt", 58, 50],
      ["updown", 96, 48],
    ],
  },
  "@lunge": {
    h: [56, 12],
    s: [56, 22],
    p: [56, 46],
    a1: [
      [58, 35],
      [58, 47],
    ],
    l1: [
      [72, 49],
      [72, 72],
      [79, 72],
    ],
    l2: [
      [43, 64],
      [27, 66],
    ],
    x: [
      ["wt", 58, 50],
      ["updown", 96, 48],
    ],
  },
  "@hipthrust": {
    h: [28, 43],
    s: [36, 48],
    p: [62, 48],
    a1: [
      [46, 45],
      [58, 43],
    ],
    l1: [
      [78, 48],
      [80, 72],
    ],
    x: [
      ["ln", 22, 51, 40, 51],
      ["ln", 26, 51, 26, 72],
      ["ln", 38, 51, 38, 72],
      ["roller", 60, 40],
      ["updown", 100, 40],
    ],
  },
  "@legext": {
    h: [47, 23],
    s: [46, 32],
    p: [46, 56],
    a1: [
      [48, 44],
      [51, 56],
    ],
    l1: [
      [62, 56],
      [81, 54],
    ],
    x: [
      ["ln", 40, 24, 40, 58],
      ["ln", 40, 58, 60, 58],
      ["wt", 82, 49],
      ["arc", 82, 34, -1],
    ],
  },
  "@legcurlseat": {
    h: [47, 23],
    s: [46, 32],
    p: [46, 56],
    a1: [
      [48, 44],
      [51, 56],
    ],
    l1: [
      [62, 56],
      [57, 70],
    ],
    x: [
      ["ln", 40, 24, 40, 58],
      ["ln", 40, 58, 60, 58],
      ["wt", 61, 71],
      ["arc", 76, 64, 1],
    ],
  },
  "@legcurllying": {
    h: [81, 51],
    s: [72, 54],
    p: [46, 55],
    a1: [
      [78, 62],
      [73, 66],
    ],
    l1: [
      [30, 56],
      [35, 40],
    ],
    x: [
      ["ln", 26, 59, 80, 59],
      ["ln", 34, 59, 34, 72],
      ["ln", 72, 59, 72, 72],
      ["wt", 38, 37],
      ["arc", 22, 34, 1],
    ],
  },
  "@calf": {
    h: [60, 11],
    s: [60, 21],
    p: [60, 45],
    a1: [
      [62, 32],
      [62, 43],
    ],
    l1: [
      [60, 58],
      [59, 67],
      [66, 71],
    ],
    x: [
      ["ln", 52, 72, 72, 72],
      ["updown", 84, 56],
    ],
  },
  "@calfseat": {
    h: [47, 23],
    s: [46, 32],
    p: [46, 56],
    a1: [
      [52, 42],
      [60, 50],
    ],
    l1: [
      [62, 56],
      [61, 67],
      [68, 71],
    ],
    x: [
      ["ln", 40, 58, 56, 58],
      ["ln", 56, 51, 68, 51],
      ["updown", 84, 60],
    ],
  },
  "@abduction": {
    h: [60, 16],
    s: [60, 27],
    p: [60, 52],
    a1: [
      [66, 38],
      [68, 48],
    ],
    a2: [
      [54, 38],
      [52, 48],
    ],
    l1: [
      [79, 58],
      [83, 72],
    ],
    l2: [
      [41, 58],
      [37, 72],
    ],
    x: [["label", "front view, knees push out"]],
  },
  "@adduction": {
    h: [60, 16],
    s: [60, 27],
    p: [60, 52],
    a1: [
      [66, 38],
      [68, 48],
    ],
    a2: [
      [54, 38],
      [52, 48],
    ],
    l1: [
      [72, 60],
      [70, 72],
    ],
    l2: [
      [48, 60],
      [50, 72],
    ],
    x: [["label", "front view, knees squeeze in"]],
  },
  "@curl": {
    h: [60, 15],
    s: [60, 25],
    p: [60, 49],
    a1: [
      [60, 37],
      [70, 29],
    ],
    l1: [
      [60, 61],
      [60, 72],
      [66, 72],
    ],
    x: [
      ["wt", 73, 27],
      ["arc", 82, 40, -1],
    ],
  },
  "@inclinecurl": {
    h: [54, 26],
    s: [50, 35],
    p: [42, 58],
    a1: [
      [52, 47],
      [62, 42],
    ],
    l1: [
      [58, 60],
      [60, 72],
    ],
    x: [
      ["ln", 36, 63, 50, 28],
      ["ln", 36, 63, 54, 63],
      ["wt", 65, 40],
    ],
  },
  "@preacher": {
    h: [58, 23],
    s: [54, 32],
    p: [46, 56],
    a1: [
      [68, 42],
      [74, 30],
    ],
    l1: [
      [60, 58],
      [60, 72],
    ],
    x: [
      ["ln", 38, 59, 52, 59],
      ["ln", 62, 35, 78, 51],
      ["wt", 75, 27],
      ["arc", 88, 40, -1],
    ],
  },
  "@bayesian": {
    h: [61, 15],
    s: [60, 25],
    p: [60, 49],
    a1: [
      [53, 37],
      [61, 33],
    ],
    l1: [
      [66, 61],
      [70, 72],
    ],
    l2: [
      [54, 61],
      [50, 72],
    ],
    x: [
      ["wall", 14],
      ["ln", 61, 33, 14, 68],
      ["label", "face away from the cable"],
    ],
  },
  "@pushdown": {
    h: [62, 15],
    s: [60, 25],
    p: [58, 49],
    a1: [
      [62, 37],
      [71, 45],
    ],
    l1: [
      [58, 61],
      [58, 72],
      [64, 72],
    ],
    x: [
      ["wall", 100],
      ["ln", 71, 45, 99, 8],
      ["updown", 84, 56],
    ],
  },
  "@ohtri": {
    h: [64, 28],
    s: [56, 31],
    p: [49, 50],
    a1: [
      [67, 17],
      [80, 10],
    ],
    l1: [
      [58, 61],
      [62, 72],
    ],
    l2: [
      [44, 61],
      [38, 72],
    ],
    x: [
      ["wall", 14],
      ["ln", 80, 10, 14, 18],
      ["label", "face away from the cable"],
    ],
  },
  "@skull": {
    h: [35, 51],
    s: [44, 54],
    p: [70, 55],
    a1: [
      [45, 41],
      [35, 39],
    ],
    l1: [
      [85, 58],
      [86, 72],
    ],
    x: [
      ["ln", 28, 58, 80, 58],
      ["ln", 36, 58, 36, 72],
      ["ln", 74, 58, 74, 72],
      ["wt", 32, 39],
      ["arc", 46, 26, -1],
    ],
  },
  "Box breathing": {
    h: [20, 63],
    s: [28, 65],
    p: [56, 65],
    a1: [
      [42, 68],
      [54, 68],
    ],
    l1: [
      [76, 66],
      [95, 67],
    ],
    x: [["box", 60, 30]],
  },
};
function fig(name) {
  const P = POSES[name] || POSES[FIGMAP[name]];
  if (!P) return "";
  const pl = (o, pts, cl) =>
    '<polyline class="' +
    cl +
    '" points="' +
    [o]
      .concat(pts)
      .map((q) => q.join(","))
      .join(" ") +
    '"/>';
  let o =
    '<svg class="fig" viewBox="0 0 120 80" role="img" aria-label="' +
    name.replace(/"/g, "") +
    ' position"><line class="fl" x1="6" y1="72.5" x2="114" y2="72.5"/>';
  (P.x || []).forEach((x) => {
    if (x[0] === "wall") o += '<line class="fl" x1="' + x[1] + '" y1="4" x2="' + x[1] + '" y2="72"/>';
    else if (x[0] === "backwall") o += '<rect class="bw" x="30" y="4" width="60" height="68"/>';
    else if (x[0] === "ln")
      o +=
        '<line class="fl" style="stroke-width:2.2" x1="' +
        x[1] +
        '" y1="' +
        x[2] +
        '" x2="' +
        x[3] +
        '" y2="' +
        x[4] +
        '"/>';
    else if (x[0] === "wt") o += '<circle class="ro" cx="' + x[1] + '" cy="' + x[2] + '" r="3.6"/>';
    else if (x[0] === "roller") o += '<circle class="ro" cx="' + x[1] + '" cy="' + x[2] + '" r="6"/>';
    else if (x[0] === "label") o += '<text class="lb" x="114" y="79.4" text-anchor="end">' + x[1] + "</text>";
    else if (x[0] === "arc")
      o +=
        '<path class="ar" d="M' +
        (x[1] - 7 * x[3]) +
        " " +
        (x[2] + 4) +
        " A8 8 0 0 " +
        (x[3] > 0 ? 1 : 0) +
        " " +
        (x[1] + 7 * x[3]) +
        " " +
        (x[2] + 4) +
        '"/><path class="ar" d="M' +
        (x[1] + 7 * x[3]) +
        " " +
        (x[2] + 4) +
        " l" +
        -4 * x[3] +
        " -1 M" +
        (x[1] + 7 * x[3]) +
        " " +
        (x[2] + 4) +
        ' l1 -4.5"/>';
    else if (x[0] === "updown")
      o +=
        '<path class="ar" d="M' +
        x[1] +
        " " +
        (x[2] - 8) +
        " v16 M" +
        (x[1] - 3) +
        " " +
        (x[2] - 5) +
        " l3 -3 l3 3 M" +
        (x[1] - 3) +
        " " +
        (x[2] + 5) +
        ' l3 3 l3 -3"/>';
    else if (x[0] === "box")
      o +=
        '<rect class="ar" x="' +
        (x[1] - 9) +
        '" y="' +
        (x[2] - 9) +
        '" width="18" height="18" rx="2"/><text class="lb" x="' +
        x[1] +
        '" y="' +
        (x[2] + 3.5) +
        '" text-anchor="middle">4</text>';
  });
  if (P.a2) o += pl(P.s, P.a2, "far");
  if (P.l2) o += pl(P.p, P.l2, "far");
  o += P.c ? '<path class="near" d="M' + P.s + " Q" + P.c + " " + P.p + '"/>' : pl(P.s, [P.p], "near");
  if (P.l1) o += pl(P.p, P.l1, "near");
  if (P.a1) o += pl(P.s, P.a1, "near");
  o += '<circle class="hd" cx="' + P.h[0] + '" cy="' + P.h[1] + '" r="5.2"/></svg>';
  return o;
}

// Jeff Nippard tier-list ratings (S+ and S only)
const TIER = {};
["Machine Chest Press", "Hack Squat", "Bayesian Cable Curl", "Overhead Triceps Extension"].forEach(
  (n) => (TIER[n] = "S+"),
);
[
  "Seated Cable Fly",
  "Lat Pulldown",
  "Neutral-Grip Lat Pulldown",
  "One-Arm Lat Pulldown",
  "Meadows Row",
  "Chest-Supported Row",
  "Seated Cable Row",
  "Wide-Grip Cable Row",
  "Cable Lateral Raise",
  "Cable Y Raise",
  "Behind-the-Back Cable Lateral Raise",
  "Reverse Pec Deck",
  "Reverse Cable Crossover",
  "Back Squat",
  "Pendulum Squat",
  "Smith Machine Squat",
  "Bulgarian Split Squat",
  "Walking Lunge",
  "Hip Abduction",
  "Back Extension",
  "Smith Machine Lunge",
  "Preacher Curl",
  "Machine Preacher Curl",
  "Preacher Hammer Curl",
  "Skull Crusher",
].forEach((n) => (TIER[n] = "S"));
const FIGMAP = {};
Object.entries({
  "@pullup": ["Pull-Up", "Chin-Up"],
  "@pulldown": ["Lat Pulldown", "Neutral-Grip Lat Pulldown", "One-Arm Lat Pulldown"],
  "@bentrow": ["Barbell Row", "Dumbbell Row", "T-Bar Row", "Meadows Row"],
  "@row": ["Seated Cable Row", "Wide-Grip Cable Row"],
  "@chestrow": ["Chest-Supported Row"],
  "@deadlift": ["Deadlift", "Romanian Deadlift"],
  "@backext": ["Back Extension"],
  "@facepull": ["Face Pull"],
  "@bench": ["Bench Press", "Dumbbell Bench Press", "Close-Grip Bench Press"],
  "@incline": ["Incline Bench Press", "Incline Dumbbell Press"],
  "@machinepress": ["Machine Chest Press"],
  "@dip": ["Dip"],
  "@pushup": ["Push-Up"],
  "@fly": ["Cable Fly", "Seated Cable Fly", "Pec Deck", "Dumbbell Fly"],
  "@ohp": ["Overhead Press", "Dumbbell Shoulder Press", "Machine Shoulder Press", "Arnold Press"],
  "@latraise": [
    "Lateral Raise",
    "Cable Lateral Raise",
    "Behind-the-Back Cable Lateral Raise",
    "Cable Y Raise",
  ],
  "@rearfly": ["Rear Delt Fly", "Reverse Pec Deck", "Reverse Cable Crossover"],
  "@frontraise": ["Front Raise"],
  "@shrug": ["Shrug"],
  "@squat": ["Back Squat", "Front Squat", "Smith Machine Squat", "Goblet Squat"],
  "@hack": ["Hack Squat", "Pendulum Squat"],
  "@legpress": ["Leg Press"],
  "@bss": ["Bulgarian Split Squat"],
  "@lunge": ["Walking Lunge", "Smith Machine Lunge"],
  "@hipthrust": ["Hip Thrust"],
  "@legext": ["Leg Extension"],
  "@legcurllying": ["Lying Leg Curl"],
  "@legcurlseat": ["Seated Leg Curl"],
  "@calf": ["Standing Calf Raise"],
  "@calfseat": ["Seated Calf Raise"],
  "@abduction": ["Hip Abduction"],
  "@adduction": ["Hip Adduction"],
  "@curl": ["Barbell Curl", "Dumbbell Curl", "Hammer Curl", "Cable Curl"],
  "@inclinecurl": ["Incline Dumbbell Curl"],
  "@preacher": ["Preacher Curl", "Machine Preacher Curl", "Preacher Hammer Curl"],
  "@bayesian": ["Bayesian Cable Curl"],
  "@pushdown": ["Triceps Pushdown", "Straight-Arm Pulldown"],
  "@ohtri": ["Overhead Triceps Extension"],
  "@skull": ["Skull Crusher"],
  "Hanging Leg Raise": ["Captain's Chair Knee Raise"],
  "Russian twist": ["Russian Twist"],
}).forEach(([k, v]) => v.forEach((n) => (FIGMAP[n] = k)));

/* ---------- pure logic ---------- */
const e1rm = (w, r) => (r <= 0 ? 0 : r === 1 ? w : w * (1 + r / 30));
function suggest(last, type) {
  if (!last || !last.length) return null;
  const [lo, hi] = type === "c" ? [6, 10] : [10, 15];
  const w = Math.max(...last.map((s) => s.w));
  const minR = Math.min(...last.filter((s) => s.w === w).map((s) => s.r));
  if (w === 0) return { w: 0, r: minR + 1, why: "Add one rep per set" };
  if (minR >= hi) {
    const inc = w >= 20 ? 2.5 : 1;
    return { w: w + inc, r: lo, why: "You reached " + hi + " reps. Go up " + inc + " kg" };
  }
  const r = Math.max(Math.min(hi, minR + 1), 1);
  return { w, r, why: "Same weight, aim for " + r + " reps" };
}
const fmt = (n) => {
  const v = Math.round(n * 100) / 100;
  return String(v);
};
const dayKey = (t) => {
  const d = new Date(t);
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
};
const weekStart = (t) => {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d.getTime();
};
const DAY = 864e5;
if (typeof module !== "undefined") {
  module.exports = { suggest, e1rm, weekStart, dayKey };
}

/* ---------- state ---------- */
const LS = "reppo.v1";
const state = { workouts: [], custom: [], rest: 120, active: null };
let pending = new Set();
let tab = "train",
  picked = new Set(),
  progEx = null,
  calM = null,
  calDay = null,
  flash = null;
let sheet = null; // {q, filter}
let play = null,
  recOpen = null,
  easyMin = 30; // play: {r, steps, i, end, left, paused, start}
let col = null,
  cloud = "wait",
  flushing = false,
  draftTimer = null;

function loadLocal() {
  try {
    const d = JSON.parse(localStorage.getItem(LS) || "null");
    if (d) {
      state.workouts = d.workouts || [];
      state.custom = d.custom || [];
      state.rest = d.rest || 120;
      state.active = d.active || null;
      pending = new Set(d.pending || []);
    }
  } catch (e) {}
}
function saveLocal() {
  try {
    localStorage.setItem(
      LS,
      JSON.stringify({
        workouts: state.workouts,
        custom: state.custom,
        rest: state.rest,
        active: state.active,
        pending: [...pending],
      }),
    );
  } catch (e) {}
}
function mark(key) {
  pending.add(key);
  saveLocal();
  flush();
}
function saveDraft() {
  pending.add("active");
  saveLocal();
  clearTimeout(draftTimer);
  draftTimer = setTimeout(flush, 2500);
}
async function flush() {
  if (!col || flushing) return;
  flushing = true;
  try {
    while (pending.size) {
      const k = pending.values().next().value;
      pending.delete(k);
      try {
        if (k.startsWith("del:")) await col.doc(k.slice(4)).delete();
        else if (k === "settings") await col.doc("settings").set({ rest: state.rest, custom: state.custom });
        else if (k === "active")
          await col.doc("active").set({ a: state.active ? JSON.parse(JSON.stringify(state.active)) : null });
        else {
          const w = state.workouts.find((x) => x.id === k);
          if (w) await col.doc(k).set(JSON.parse(JSON.stringify(w)));
        }
        cloud = "ok";
      } catch (e) {
        pending.add(k);
        cloud = "err";
        break;
      }
      saveLocal();
    }
  } finally {
    flushing = false;
    if (tab === "more") render();
  }
}
function timeout(p, ms) {
  return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);
}
async function initCloud() {
  try {
    if (!window.claude || typeof window.claude.use !== "function") {
      cloud = "local";
      return;
    }
    const [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]);
    if (!db || !user) {
      cloud = "local";
      return;
    }
    const uid = await user.id();
    if (!uid) {
      cloud = "local";
      return;
    }
    const c = db.collection("data/users/" + uid);
    const snap = await timeout(c.get(), 10000);
    const remote = [];
    let rs = null,
      ra = null;
    snap.docs.forEach((d) => {
      const v = d.data();
      if (!v) return;
      if (d.id.startsWith("w_")) remote.push(JSON.parse(JSON.stringify(v)));
      else if (d.id === "settings") rs = v;
      else if (d.id === "active") ra = v;
    });
    const ids = new Set(remote.map((w) => w.id));
    const keepLocal = state.workouts.filter((w) => !ids.has(w.id) && pending.has(w.id));
    state.workouts = remote
      .filter((w) => !pending.has("del:" + w.id))
      .concat(keepLocal)
      .sort((a, b) => a.start - b.start);
    if (rs && !pending.has("settings")) {
      state.rest = rs.rest || 120;
      state.custom = JSON.parse(JSON.stringify(rs.custom || []));
    }
    if (!state.active && ra && ra.a && !pending.has("active"))
      state.active = JSON.parse(JSON.stringify(ra.a));
    col = c;
    cloud = "ok";
    saveLocal();
    render();
    flush();
  } catch (e) {
    cloud = "local";
  } finally {
    if (tab === "more") render();
  }
}

/* ---------- derived ---------- */
const allEx = () => LIB.concat(state.custom.map((c) => [c.name, c.muscle, c.type]));
const exInfo = (name) => allEx().find((e) => e[0] === name) || [name, "Other", "i"];
function lastSets(name, before) {
  for (let i = state.workouts.length - 1; i >= 0; i--) {
    const w = state.workouts[i];
    if (before && w.start >= before) continue;
    const e = w.ex.find((x) => x.name === name);
    if (e && e.sets.length) return { sets: e.sets, t: w.start };
  }
  return null;
}
function bestE(name, before) {
  let b = 0;
  state.workouts.forEach((w) => {
    if (before && w.start >= before) return;
    w.ex.forEach((e) => {
      if (e.name === name)
        e.sets.forEach((s) => {
          b = Math.max(b, e1rm(s.w, s.r));
        });
    });
  });
  return b;
}
function muscleLast(m) {
  for (let i = state.workouts.length - 1; i >= 0; i--) {
    const w = state.workouts[i];
    if ((m === "Core" && w.kind === "abs") || w.ex.some((e) => exInfo(e.name)[1] === m)) return w.start;
  }
  return null;
}
const volume = (w) => w.ex.reduce((a, e) => a + e.sets.reduce((b, s) => b + s.w * s.r, 0), 0);
const setCount = (w) => w.ex.reduce((a, e) => a + e.sets.length, 0);
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
const dfmt = (t, o) =>
  new Date(t).toLocaleDateString("en-GB", o || { weekday: "short", day: "numeric", month: "short" });
function ago(t) {
  const n = Math.round((new Date().setHours(0, 0, 0, 0) - new Date(t).setHours(0, 0, 0, 0)) / DAY);
  return n <= 0 ? "today" : n === 1 ? "yesterday" : n + " days ago";
}

/* ---------- render ---------- */
const $ = (id) => document.getElementById(id);
function render() {
  document.querySelectorAll("nav button").forEach((b) => b.toggleAttribute("aria-current", false));
  const cur = document.querySelector('nav button[data-tab="' + tab + '"]');
  if (cur) cur.setAttribute("aria-current", "page");
  const m = $("main");
  m.innerHTML =
    play && play.tab === tab && !(tab === "train" && state.active)
      ? vPlayer()
      : tab === "train"
        ? state.active
          ? vActive()
          : recOpen === "abs"
            ? vRoutine(ABS)
            : vStart()
        : tab === "recover"
          ? vRecover()
          : tab === "progress"
            ? vProgress()
            : tab === "history"
              ? vHistory()
              : vMore();
  renderSheet();
}
// True on iPhone/iPad when Reppo is open in the browser rather than as the Home Screen app.
function iosBrowser() {
  if (typeof navigator === "undefined") return false;
  const ios =
    /iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
  const standalone =
    navigator.standalone === true ||
    (typeof matchMedia === "function" && matchMedia("(display-mode: standalone)").matches);
  return ios && !standalone;
}
function vStart() {
  const rows = MUSCLES.map((m) => {
    const t = muscleLast(m);
    let cls = "",
      txt = "Not logged yet";
    if (t) {
      const n = Math.round((new Date().setHours(0, 0, 0, 0) - new Date(t).setHours(0, 0, 0, 0)) / DAY);
      if (n <= 1) {
        cls = "recent";
        txt = "Trained " + ago(t);
      } else {
        cls = "ready";
        txt = "Rested " + n + " days";
      }
    }
    return (
      '<button class="muscle" data-act="pick" data-m="' +
      m +
      '" aria-pressed="' +
      picked.has(m) +
      '"><b>' +
      m +
      '</b><span class="pill ' +
      cls +
      '"><i></i>' +
      txt +
      "</span></button>"
    );
  }).join("");
  const ws = weekStart(Date.now()),
    wk = state.workouts.filter((w) => w.kind !== "rec" && w.start >= ws).length,
    pn = planNext();
  return (
    (flash ? '<div class="toast" role="status">' + esc(flash) + "</div>" : "") +
    (iosBrowser()
      ? '<section class="panel ios-hint"><h2>Add Reppo to your Home Screen</h2><p class="sub">In Safari, tap Share, then Add to Home Screen. Then open Reppo from that icon. On iPhone, Safari can delete a log that is only saved in the browser, and the Home Screen app keeps its own separate log.</p></section>'
      : "") +
    '<header class="stack"><h1>What feels ready today?</h1><p class="sub">' +
    dfmt(Date.now(), { weekday: "long", day: "numeric", month: "long" }) +
    " · " +
    wk +
    (wk === 1 ? " workout" : " workouts") +
    " this week</p></header>" +
    '<div class="muscles">' +
    rows +
    "</div>" +
    '<button class="btn primary wide" data-act="start">' +
    (picked.size ? "Start " + [...picked].join(" + ") + " workout" : "Start workout") +
    "</button>" +
    '<h2 style="margin-top:6px">45-minute plan · 4 days a week</h2>' +
    PLAN.map(
      (d) =>
        '<button class="rt' +
        (d.id === pn ? " sug" : "") +
        '" data-act="plan-start" data-id="' +
        d.id +
        '"><span>' +
        (d.id === pn ? '<span class="tagline">Next up</span>' : "") +
        "<b>" +
        d.name +
        "</b><small>" +
        d.tag +
        " · " +
        d.ex.reduce((a, e) => a + e[1], 0) +
        ' hard sets</small></span><span class="num">' +
        d.ex.length +
        "<span>lifts</span></span></button>",
    ).join("") +
    '<p class="sub">Low volume, high effort: one or two hard sets per lift, taken to failure or one rep short. Order: Upper A, Lower A, rest, Upper B, Lower B.</p>' +
    '<h2 style="margin-top:6px">Abs</h2>' +
    '<button class="rt" data-act="abs-gym"><span><span class="tagline">Gym · weights and machines</span><b>Abs workout</b><small>' +
    ABSGYM.join(", ") +
    '</small></span><span class="num">' +
    ABSGYM.length +
    "<span>lifts</span></span></button>" +
    RCARD(ABS, "", "No equipment · follow the timer") +
    '<p class="sub">Pick one or more muscle groups, or start empty and add any exercise. Green means the muscle has had at least two days of rest.</p>'
  );
}
function vActive() {
  const a = state.active;
  const done = a.ex.reduce((n, e) => n + e.sets.filter((s) => s.done).length, 0);
  const vol = a.ex.reduce(
    (n, e) => n + e.sets.filter((s) => s.done).reduce((b, s) => b + (+s.w || 0) * (+s.r || 0), 0),
    0,
  );
  const cards = a.ex
    .map((e, ei) => {
      const info = exInfo(e.name),
        last = lastSets(e.name),
        sg = last ? suggest(last.sets, info[2]) : null;
      const rows = e.sets
        .map(
          (s, si) =>
            '<span class="n">' +
            (si + 1) +
            "</span>" +
            '<input id="w-' +
            ei +
            "-" +
            si +
            '" inputmode="decimal" aria-label="Set ' +
            (si + 1) +
            ' weight in kg" data-f="w" data-ei="' +
            ei +
            '" data-si="' +
            si +
            '" value="' +
            esc(s.w) +
            '" placeholder="' +
            (sg ? fmt(sg.w) : "0") +
            '"' +
            (s.done ? " disabled" : "") +
            ">" +
            '<input id="r-' +
            ei +
            "-" +
            si +
            '" inputmode="numeric" aria-label="Set ' +
            (si + 1) +
            ' reps" data-f="r" data-ei="' +
            ei +
            '" data-si="' +
            si +
            '" value="' +
            esc(s.r) +
            '" placeholder="' +
            (sg ? sg.r : "–") +
            '"' +
            (s.done ? " disabled" : "") +
            ">" +
            '<button class="check" data-act="done" data-ei="' +
            ei +
            '" data-si="' +
            si +
            '" aria-pressed="' +
            !!s.done +
            '" aria-label="' +
            (s.done ? "Undo set " + (si + 1) : "Complete set " + (si + 1)) +
            '"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></button>',
        )
        .join("");
      return (
        '<section class="ex"><div class="row between"><div><h3>' +
        esc(e.name) +
        '</h3><span class="hint">' +
        esc(info[1]) +
        (TIER[e.name] ? ' · <span style="color:var(--good)">Nippard ' + TIER[e.name] + " tier</span>" : "") +
        "</span></div>" +
        (fig(e.name) ? '<span class="exfig" style="margin-left:auto">' + fig(e.name) + "</span>" : "") +
        '<button class="x" data-act="rm-ex" data-ei="' +
        ei +
        '" data-confirm="1" aria-label="Remove ' +
        esc(e.name) +
        '">×</button></div>' +
        (last
          ? '<p class="hint">Last time (' +
            ago(last.t) +
            "): <strong>" +
            last.sets.map((s) => fmt(s.w) + "×" + s.r).join(" · ") +
            "</strong></p>"
          : '<p class="hint">First time logging this. Pick a weight you can lift with good form.</p>') +
        (e.note ? '<p class="hint"><strong>Target:</strong> ' + esc(e.note) + "</p>" : "") +
        (sg
          ? '<p class="next">' +
            (e.note ? "Last time suggests: " : "Next: ") +
            (sg.w ? fmt(sg.w) + " kg × " : "") +
            sg.r +
            (sg.w ? "" : " reps") +
            ". " +
            esc(sg.why) +
            ".</p>"
          : "") +
        '<div class="sets"><span class="h">Set</span><span class="h">kg</span><span class="h">Reps</span><span class="h">Done</span>' +
        rows +
        "</div>" +
        '<div class="row"><button class="btn small" data-act="add-set" data-ei="' +
        ei +
        '">+ Add set</button>' +
        (e.sets.length > 1
          ? '<button class="link" data-act="rm-set" data-ei="' + ei + '">Remove last set</button>'
          : "") +
        "</div></section>"
      );
    })
    .join("");
  return (
    '<header class="row between"><div><h1>' +
    (a.muscles.length ? esc(a.muscles.join(" + ")) : "Workout") +
    '</h1><p class="sub">Started ' +
    new Date(a.start).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) +
    '</p></div><button class="btn primary" data-act="finish">Finish</button></header>' +
    '<div class="meter"><div><span class="num" id="elapsed">' +
    elapsed() +
    '</span><span>Minutes</span></div><div><span class="num">' +
    done +
    '</span><span>Sets done</span></div><div><span class="num">' +
    fmt(Math.round(vol)) +
    "</span><span>kg lifted</span></div></div>" +
    (a.ex.length ? cards : '<div class="empty">No exercises yet. Add your first one below.</div>') +
    '<button class="btn wide" data-act="open-sheet">+ Add exercise</button>' +
    '<button class="link" data-act="discard" data-confirm="1" style="align-self:center">Discard workout</button>'
  );
}
const elapsed = () =>
  state.active ? String(Math.max(0, Math.floor((Date.now() - state.active.start) / 6e4))) : "0";

function vProgress() {
  const W = state.workouts.filter((w) => w.kind !== "rec");
  if (!W.length)
    return '<header class="stack"><h1>Progress</h1></header><div class="empty">Finish your first workout and your strength charts, weekly volume and records show up here.</div>';
  const now = Date.now(),
    ws = weekStart(now);
  const wk = W.filter((w) => w.start >= ws);
  let streak = 0,
    cur = ws;
  const weeks = new Set(W.map((w) => weekStart(w.start)));
  if (!weeks.has(cur)) cur -= 7 * DAY;
  while (weeks.has(weekStart(cur + DAY / 2))) {
    streak++;
    cur = weekStart(cur - DAY);
  }
  const per = {};
  MUSCLES.forEach((m) => (per[m] = 0));
  W.filter((w) => w.start >= now - 7 * DAY).forEach((w) => {
    if (w.kind === "abs") per.Core += w.n || 0;
    w.ex.forEach((e) => {
      const m = exInfo(e.name)[1];
      per[m] = (per[m] || 0) + e.sets.length;
    });
  });
  const mx = Math.max(1, ...Object.values(per));
  const bars = Object.keys(per)
    .map(
      (m) =>
        "<span>" +
        esc(m) +
        '</span><span class="track"><i style="width:' +
        (per[m] / mx) * 100 +
        '%"></i></span><span class="v">' +
        per[m] +
        "</span>",
    )
    .join("");
  const names = [];
  for (let i = W.length - 1; i >= 0; i--)
    W[i].ex.forEach((e) => {
      if (!names.includes(e.name)) names.push(e.name);
    });
  if (!progEx || !names.includes(progEx)) progEx = names[0];
  const pts = [];
  W.forEach((w) => {
    const e = w.ex.find((x) => x.name === progEx);
    if (e && e.sets.length) pts.push({ t: w.start, v: Math.max(...e.sets.map((s) => e1rm(s.w, s.r))) });
  });
  const prs = names
    .map((n) => {
      let b = null;
      W.forEach((w) =>
        w.ex.forEach((e) => {
          if (e.name === n)
            e.sets.forEach((s) => {
              const v = e1rm(s.w, s.r);
              if (!b || v > b.v) b = { v, w: s.w, r: s.r, t: w.start };
            });
        }),
      );
      return { n, b };
    })
    .filter((p) => p.b);
  return (
    '<header class="stack"><h1>Progress</h1></header>' +
    '<div class="meter"><div><span class="num">' +
    wk.length +
    '</span><span>This week</span></div><div><span class="num">' +
    fmt(Math.round(wk.reduce((a, w) => a + volume(w), 0))) +
    '</span><span>kg this week</span></div><div><span class="num">' +
    streak +
    "</span><span>Week streak</span></div></div>" +
    '<section class="panel stack"><h2>Sets per muscle, last 7 days</h2><div class="bars">' +
    bars +
    "</div></section>" +
    (!names.length
      ? ""
      : '<section class="panel stack"><h2>Estimated 1-rep max</h2><select class="field" id="progSel" aria-label="Exercise">' +
        names
          .map((n) => "<option" + (n === progEx ? " selected" : "") + ">" + esc(n) + "</option>")
          .join("") +
        "</select>" +
        lineChart(pts) +
        "</section>" +
        '<section class="panel"><h2 style="margin-bottom:4px">Personal records</h2>' +
        prs
          .map(
            (p) =>
              '<div class="pr"><div>' +
              esc(p.n) +
              "<small>" +
              dfmt(p.b.t) +
              '</small></div><div class="num">' +
              (p.b.w ? fmt(p.b.w) + " kg × " : "") +
              p.b.r +
              (p.b.w ? "" : " reps") +
              "</div></div>",
          )
          .join("") +
        "</section>")
  );
}
function lineChart(pts) {
  if (!pts.length) return "";
  if (pts.every((p) => p.v === 0))
    return (
      '<p class="sub">Bodyweight exercise. Best: ' +
      Math.max(
        ...state.workouts.flatMap((w) =>
          (w.ex || []).filter((e) => e.name === progEx).flatMap((e) => e.sets.map((s) => s.r)),
        ),
      ) +
      " reps.</p>"
    );
  if (pts.length === 1)
    return (
      '<p><span class="num" style="font-size:40px">' +
      fmt(Math.round(pts[0].v * 10) / 10) +
      '</span> kg <span class="sub">from one session. Log it again to see a trend.</span></p>'
    );
  const Wd = 320,
    H = 150,
    l = 34,
    r = 12,
    t = 14,
    b = 24;
  let lo = Math.min(...pts.map((p) => p.v)),
    hi = Math.max(...pts.map((p) => p.v));
  if (hi - lo < 5) {
    hi += 2.5;
    lo -= 2.5;
  }
  const x = (i) => l + ((Wd - l - r) * i) / (pts.length - 1),
    y = (v) => t + (H - t - b) * (1 - (v - lo) / (hi - lo));
  const path = pts.map((p, i) => (i ? "L" : "M") + x(i).toFixed(1) + " " + y(p.v).toFixed(1)).join(" ");
  const last = pts[pts.length - 1],
    d = last.v - pts[0].v;
  return (
    '<p><span class="num" style="font-size:40px">' +
    fmt(Math.round(last.v * 10) / 10) +
    '</span> kg <span class="sub" style="color:' +
    (d >= 0 ? "var(--good)" : "var(--mute)") +
    '">' +
    (d >= 0 ? "+" : "") +
    fmt(Math.round(d * 10) / 10) +
    " kg since " +
    dfmt(pts[0].t, { day: "numeric", month: "short" }) +
    "</span></p>" +
    '<svg class="chart" viewBox="0 0 ' +
    Wd +
    " " +
    H +
    '" role="img" aria-label="Estimated one rep max over time">' +
    '<line x1="' +
    l +
    '" x2="' +
    (Wd - r) +
    '" y1="' +
    y(hi) +
    '" y2="' +
    y(hi) +
    '" stroke="var(--line)" stroke-dasharray="2 4"/><line x1="' +
    l +
    '" x2="' +
    (Wd - r) +
    '" y1="' +
    y(lo) +
    '" y2="' +
    y(lo) +
    '" stroke="var(--line)"/>' +
    '<text x="' +
    (l - 6) +
    '" y="' +
    (y(hi) + 4) +
    '" text-anchor="end" font-size="10" fill="var(--mute)">' +
    Math.round(hi) +
    '</text><text x="' +
    (l - 6) +
    '" y="' +
    (y(lo) + 4) +
    '" text-anchor="end" font-size="10" fill="var(--mute)">' +
    Math.round(lo) +
    "</text>" +
    '<path d="' +
    path +
    " L" +
    x(pts.length - 1) +
    " " +
    y(lo) +
    " L" +
    x(0) +
    " " +
    y(lo) +
    ' Z" fill="var(--accent)" opacity=".14"/><path d="' +
    path +
    '" fill="none" stroke="var(--accent)" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>' +
    pts
      .map(
        (p, i) =>
          '<circle cx="' +
          x(i) +
          '" cy="' +
          y(p.v) +
          '" r="' +
          (i === pts.length - 1 ? 4.5 : 2.2) +
          '" fill="' +
          (i === pts.length - 1 ? "var(--ink)" : "var(--accent)") +
          '"/>',
      )
      .join("") +
    '<text x="' +
    l +
    '" y="' +
    (H - 6) +
    '" font-size="10" fill="var(--mute)">' +
    dfmt(pts[0].t, { day: "numeric", month: "short" }) +
    '</text><text x="' +
    (Wd - r) +
    '" y="' +
    (H - 6) +
    '" text-anchor="end" font-size="10" fill="var(--mute)">' +
    dfmt(last.t, { day: "numeric", month: "short" }) +
    "</text></svg>"
  );
}
function vHistory() {
  if (!calM) {
    const d = new Date();
    calM = new Date(d.getFullYear(), d.getMonth(), 1);
  }
  const y = calM.getFullYear(),
    mo = calM.getMonth(),
    days = new Date(y, mo + 1, 0).getDate(),
    off = (calM.getDay() + 6) % 7;
  const has = new Set(state.workouts.filter((w) => w.kind !== "rec").map((w) => dayKey(w.start))),
    recD = new Set(state.workouts.filter((w) => w.kind === "rec").map((w) => dayKey(w.start))),
    today = dayKey(Date.now());
  let cells = ["M", "T", "W", "T", "F", "S", "S"].map((d) => '<span class="d">' + d + "</span>").join("");
  for (let i = 0; i < off; i++) cells += '<span class="e"></span>';
  for (let d = 1; d <= days; d++) {
    const k = dayKey(new Date(y, mo, d).getTime());
    cells +=
      '<button class="' +
      (has.has(k) ? "has " : recD.has(k) ? "rec " : "") +
      (k === today ? "today" : "") +
      '" data-act="cal-day" data-k="' +
      k +
      '" aria-pressed="' +
      (calDay === k) +
      '" aria-label="' +
      d +
      (has.has(k) ? ", workout logged" : recD.has(k) ? ", recovery logged" : "") +
      '">' +
      d +
      "</button>";
  }
  const list = state.workouts
    .filter((w) => {
      const d = new Date(w.start);
      return calDay ? dayKey(w.start) === calDay : d.getFullYear() === y && d.getMonth() === mo;
    })
    .slice()
    .reverse();
  const sess = list
    .map((w) =>
      w.kind
        ? '<section class="panel sess"><div class="row between"><div><span class="tagline">' +
          (w.kind === "abs" ? "Guided workout" : "Recovery") +
          "</span><h3>" +
          esc(w.name || "Recovery") +
          '</h3><span class="sub">' +
          dfmt(w.start) +
          " · " +
          Math.max(1, Math.round((w.end - w.start) / 6e4)) +
          ' min</span></div><button class="x" data-act="del-w" data-id="' +
          w.id +
          '" data-confirm="1" aria-label="Delete session">×</button></div></section>'
        : '<section class="panel sess stack"><div class="row between"><div><h3>' +
          esc(w.muscles && w.muscles.length ? w.muscles.join(" + ") : "Workout") +
          '</h3><span class="sub">' +
          dfmt(w.start) +
          " · " +
          Math.max(1, Math.round((w.end - w.start) / 6e4)) +
          " min · " +
          setCount(w) +
          " sets · " +
          fmt(Math.round(volume(w))) +
          ' kg</span></div><button class="x" data-act="del-w" data-id="' +
          w.id +
          '" data-confirm="1" aria-label="Delete workout">×</button></div><ul>' +
          w.ex
            .map(
              (e) =>
                "<li><span>" +
                esc(e.name) +
                "</span><span>" +
                e.sets.map((s) => fmt(s.w) + "×" + s.r).join("  ") +
                "</span></li>",
            )
            .join("") +
          "</ul></section>",
    )
    .join("");
  return (
    '<header class="row between"><h1>' +
    calM.toLocaleDateString("en-GB", { month: "long", year: "numeric" }) +
    '</h1><div class="row"><button class="btn small" data-act="cal-nav" data-v="-1" aria-label="Previous month">‹</button><button class="btn small" data-act="cal-nav" data-v="1" aria-label="Next month">›</button></div></header>' +
    '<div class="cal">' +
    cells +
    "</div>" +
    (sess ||
      '<div class="empty">' +
        (calDay ? "Nothing logged on this day." : "Nothing logged this month.") +
        "</div>")
  );
}
function suggestRec() {
  const now = Date.now(),
    recent = new Set();
  state.workouts.forEach((w) => {
    if (!w.kind && now - w.start < 2 * DAY) w.ex.forEach((e) => recent.add(exInfo(e.name)[1]));
  });
  if (recent.has("Legs")) return { id: "legs", why: "You trained legs in the last two days" };
  if (["Back", "Chest", "Shoulders", "Arms"].some((m) => recent.has(m)))
    return { id: "upper", why: "You trained upper body in the last two days" };
  return { id: "run", why: "Good default after any run" };
}
function vRecover() {
  const ws = weekStart(Date.now()),
    n = state.workouts.filter((w) => w.kind === "rec" && w.start >= ws).length,
    sg = suggestRec();
  if (recOpen && REC.some((x) => x.id === recOpen)) return vRoutine(routine(recOpen));
  const card = (r, s) => RCARD(r, s ? sg.why : "");
  const first = REC.find((r) => r.id === sg.id);
  return vRecList(n, first, card);
}
function vRoutine(r) {
  const st = recSteps(r);
  return (
    '<header class="stack"><button class="link" data-act="rec-back" style="align-self:flex-start;padding-left:0">‹ Back</button><h1>' +
    esc(r.name) +
    '</h1><p class="sub">' +
    recMins(r) +
    " min · " +
    (r.rest ? r.rounds + " rounds · " + r.rest + " s rest between moves" : st.length + " holds") +
    (r.gear ? " · Needs: " + esc(r.gear) : " · No equipment") +
    "</p></header>" +
    '<button class="btn primary wide" data-act="rec-start" data-id="' +
    r.id +
    '">Start guided routine</button>' +
    '<ul class="steps">' +
    r.steps
      .map(
        (s) =>
          '<li><span class="th">' +
          fig(s[0]) +
          '</span><span class="nm">' +
          esc(s[0]) +
          "</span><span>" +
          s[1] +
          " s" +
          (s[2] === 2 ? " each side" : "") +
          "</span></li>",
      )
      .join("") +
    "</ul>" +
    '<p class="sub">' +
    (r.rest
      ? "Move with control and keep your lower back from arching. Stop a move early if your form slips."
      : "Ease into each position and stop short of pain. A stretch should feel like mild tension, not a sharp pull.") +
    "</p>"
  );
}
const RCARD = (r, why, tag) =>
  '<button class="rt' +
  (why ? " sug" : "") +
  '" data-act="rec-open" data-id="' +
  r.id +
  '"><span>' +
  (why || tag ? '<span class="tagline">' + (why ? "Suggested · " + esc(why) : esc(tag)) + "</span>" : "") +
  "<b>" +
  esc(r.name) +
  "</b><small>" +
  esc(r.tag) +
  (r.gear ? " · " + esc(r.gear) : "") +
  '</small></span><span class="num">' +
  recMins(r) +
  "<span>min</span></span></button>";
function vRecList(n, first, card) {
  return (
    (flash ? '<div class="toast" role="status">' + esc(flash) + "</div>" : "") +
    '<header class="stack"><h1>Recover</h1><p class="sub">' +
    n +
    (n === 1 ? " recovery session" : " recovery sessions") +
    " this week</p></header>" +
    card(first, true) +
    REC.filter((r) => r !== first)
      .map((r) => card(r, false))
      .join("") +
    '<section class="panel stack"><h2>Log easy movement</h2><p class="sub">Light activity on a rest day counts as recovery. Keep the effort easy enough to hold a conversation.</p><div class="chips">' +
    [15, 20, 30, 45, 60]
      .map(
        (m) =>
          '<button class="chip" data-act="easy-min" data-v="' +
          m +
          '" aria-pressed="' +
          (easyMin === m) +
          '">' +
          m +
          " min</button>",
      )
      .join("") +
    '</div><div class="row wrap">' +
    EASY.map(
      (e) => '<button class="btn small" data-act="easy-log" data-n="' + e + '">+ ' + e + "</button>",
    ).join("") +
    "</div></section>"
  );
}
function vPlayer() {
  const p = play,
    s = p.steps[p.i],
    nx = p.steps[p.i + 1];
  return (
    '<div class="player"><div class="dots" aria-hidden="true">' +
    p.steps.map((_, i) => '<i class="' + (i < p.i ? "d" : i === p.i ? "c" : "") + '"></i>').join("") +
    "</div>" +
    '<p class="sub">' +
    esc(p.r.name) +
    " · " +
    (s.round && p.r.rounds > 1
      ? "Round " + s.round + " of " + p.r.rounds
      : p.i + 1 + " of " + p.steps.length) +
    "</p>" +
    '<div><span class="tagline" style="visibility:' +
    (s.side ? "visible" : "hidden") +
    '">' +
    (s.side || "Both") +
    "</span><h1>" +
    esc(s.n) +
    "</h1></div>" +
    '<div class="figbox"' +
    (s.rest ? ' style="opacity:.55"' : "") +
    ">" +
    fig(s.fig || s.n) +
    "</div>" +
    '<div class="clock" id="pclock" role="timer">' +
    pfmt(p.left) +
    "</div>" +
    '<p class="cue">' +
    esc(s.cue) +
    "</p>" +
    '<div class="row"><button class="btn" data-act="p-prev"' +
    (p.i ? "" : ' disabled style="opacity:.4"') +
    '>Back</button><button class="btn primary" data-act="p-pause" style="min-width:110px">' +
    (p.paused ? "Resume" : "Pause") +
    '</button><button class="btn" data-act="p-next">' +
    (nx ? "Skip" : "Finish") +
    "</button></div>" +
    '<p class="sub">' +
    (nx ? "Next: " + esc(nx.n) + (nx.side ? " (" + nx.side.toLowerCase() + ")" : "") : "Last one") +
    "</p>" +
    '<button class="link" data-act="p-end" data-confirm="1">End without logging</button></div>'
  );
}
const pfmt = (n) => Math.floor(n / 60) + ":" + String(n % 60).padStart(2, "0");
function pGo(i) {
  if (i >= play.steps.length) {
    const t = play.tab;
    logRec(
      play.r.name,
      play.start,
      Date.now(),
      play.r.kind || "rec",
      play.steps.filter((x) => !x.rest).length,
    );
    play = null;
    if (tab === t) {
      render();
      $("main").scrollTop = 0;
    }
    return;
  }
  play.i = Math.max(0, i);
  play.left = play.steps[play.i].sec;
  play.end = Date.now() + play.left * 1000;
  if (tab === play.tab) render();
}
function logRec(name, start, end, kind, n) {
  const w = {
    id: "w_" + Date.now().toString(36),
    kind: kind || "rec",
    name,
    start,
    end,
    muscles: [],
    ex: [],
  };
  if (n) w.n = n;
  state.workouts.push(w);
  state.workouts.sort((a, b) => a.start - b.start);
  mark(w.id);
  flash =
    name +
    " logged: " +
    Math.max(1, Math.round((end - start) / 6e4)) +
    (w.kind === "rec" ? " min of recovery." : " min.");
}
setInterval(() => {
  if (!play || play.paused) return;
  const left = Math.ceil((play.end - Date.now()) / 1000);
  if (left <= 0) {
    pGo(play.i + 1);
    return;
  }
  play.left = left;
  const c = $("pclock");
  if (c) c.textContent = pfmt(left);
}, 250);
function vMore() {
  const st =
    cloud === "ok"
      ? pending.size
        ? "Saving to your account…"
        : "Saved to your account. Your log follows you across devices."
      : cloud === "wait"
        ? "Connecting to your account…"
        : cloud === "err"
          ? "Could not reach your account just now. Changes are kept on this device and will be sent on the next save."
          : "Saved on this device only. Use the backup below to move your log.";
  return (
    '<header class="stack"><h1>More</h1></header>' +
    '<p class="status ' +
    (cloud === "ok" && !pending.size ? "ok" : "") +
    '"><i></i><span>' +
    st +
    "</span></p>" +
    '<section class="panel stack"><h2>Rest timer</h2><p class="sub">Starts each time you complete a set.</p><div class="chips">' +
    [60, 90, 120, 150, 180, 240]
      .map(
        (s) =>
          '<button class="chip" data-act="rest" data-v="' +
          s +
          '" aria-pressed="' +
          (state.rest === s) +
          '">' +
          Math.floor(s / 60) +
          ":" +
          String(s % 60).padStart(2, "0") +
          "</button>",
      )
      .join("") +
    "</div></section>" +
    '<section class="panel stack"><h2>Backup</h2><p class="sub">' +
    state.workouts.length +
    (state.workouts.length === 1 ? " session" : " sessions") +
    ' logged. Copy your log as text and keep it somewhere safe.</p><button class="btn" data-act="export">Copy backup</button><textarea class="field" id="backup" aria-label="Backup text" placeholder="Paste a backup here to restore it"></textarea><button class="btn ghost" data-act="import">Restore from pasted backup</button><p class="sub" id="bmsg" role="status"></p></section>' +
    '<p class="sub">Weights are in kg. Estimated 1-rep max uses the Epley formula: weight × (1 + reps ÷ 30).</p>'
  );
}
function renderSheet() {
  const el = $("sheet");
  if (!sheet) {
    el.classList.remove("on");
    return;
  }
  el.classList.add("on");
  const q = sheet.q.trim().toLowerCase(),
    inW = new Set(state.active ? state.active.ex.map((e) => e.name) : []);
  const list = allEx().filter(
    (e) =>
      (sheet.filter === "All" || (sheet.filter === "Top rated" ? !!TIER[e[0]] : e[1] === sheet.filter)) &&
      (!q || e[0].toLowerCase().includes(q)) &&
      !inW.has(e[0]),
  );
  const html = list
    .map((e) => {
      const l = lastSets(e[0]);
      return (
        '<button class="pick" data-act="add-ex" data-n="' +
        esc(e[0]) +
        '"><span class="row"><span class="th">' +
        fig(e[0]) +
        "</span><span><b>" +
        esc(e[0]) +
        "</b><br><small>" +
        esc(e[1]) +
        (TIER[e[0]] ? ' · <span style="color:var(--good)">' + TIER[e[0]] + " tier</span>" : "") +
        "</small></span></span><small>" +
        (l ? fmt(Math.max(...l.sets.map((s) => s.w))) + " kg · " + ago(l.t) : "New") +
        "</small></button>"
      );
    })
    .join("");
  const keep = document.activeElement && document.activeElement.id === "q";
  $("sheetInner").innerHTML =
    '<div class="row between"><h1>Add exercise</h1><button class="btn small ghost" data-act="close-sheet">Close</button></div>' +
    '<input class="field" id="q" type="search" placeholder="Search exercises" aria-label="Search exercises" value="' +
    esc(sheet.q) +
    '">' +
    '<div class="chips">' +
    ["All", "Top rated"]
      .concat(MUSCLES)
      .map(
        (m) =>
          '<button class="chip" data-act="filter" data-m="' +
          m +
          '" aria-pressed="' +
          (sheet.filter === m) +
          '">' +
          m +
          "</button>",
      )
      .join("") +
    "</div>" +
    '<div class="list">' +
    html +
    '<div class="stack" style="padding-top:18px"><h2>Not in the list?</h2><input class="field" id="cname" placeholder="Exercise name" aria-label="New exercise name" value="' +
    esc(sheet.q) +
    '"><div class="row"><select class="field" id="cmuscle" aria-label="Muscle group">' +
    MUSCLES.map((m) => "<option" + (m === sheet.filter ? " selected" : "") + ">" + m + "</option>").join("") +
    '</select><select class="field" id="ctype" aria-label="Exercise type"><option value="c">Compound</option><option value="i">Isolation</option></select></div><button class="btn" data-act="add-custom">Create and add</button></div></div>';
  if (keep) {
    const i = $("q");
    i.focus();
    i.setSelectionRange(i.value.length, i.value.length);
  }
}

/* ---------- timer ---------- */
let tEnd = 0,
  tTotal = 0,
  tInt = null;
function startTimer(sec) {
  tTotal = sec;
  tEnd = Date.now() + sec * 1000;
  $("timer").className = "on";
  clearInterval(tInt);
  tInt = setInterval(tick, 250);
  tick();
}
function stopTimer() {
  clearInterval(tInt);
  tInt = null;
  $("timer").className = "";
}
function tick() {
  const left = Math.ceil((tEnd - Date.now()) / 1000),
    el = $("timer");
  if (left <= 0) {
    $("tclock").textContent = "0:00";
    $("tlabel").textContent = "Rest over. Next set.";
    $("tbar").style.width = "100%";
    el.className = "on done";
    if (left < -20) stopTimer();
    return;
  }
  el.className = "on";
  $("tlabel").textContent = "Rest";
  $("tclock").textContent = Math.floor(left / 60) + ":" + String(left % 60).padStart(2, "0");
  $("tbar").style.width = Math.min(100, (1 - left / tTotal) * 100) + "%";
}
setInterval(() => {
  const e = $("elapsed");
  if (e) e.textContent = elapsed();
}, 15000);

/* ---------- actions ---------- */
let armed = null,
  armTimer = null;
function needsConfirm(btn) {
  if (armed === btn) {
    armed = null;
    clearTimeout(armTimer);
    return false;
  }
  if (armed) disarm();
  armed = btn;
  btn.dataset.old = btn.innerHTML;
  btn.innerHTML = "Tap again";
  btn.style.cssText += ";width:auto;padding:0 10px;font-size:13px;color:#ff8f7a;text-decoration:none";
  armTimer = setTimeout(disarm, 3000);
  return true;
}
function disarm() {
  if (armed && armed.isConnected) {
    armed.innerHTML = armed.dataset.old;
    armed.style.cssText = "";
  }
  armed = null;
}
const num = (v) => {
  const n = parseFloat(String(v).replace(",", "."));
  return isFinite(n) && n >= 0 ? n : NaN;
};

document.addEventListener("click", (ev) => {
  const tb = ev.target.closest("[data-tab]");
  if (tb) {
    tab = tb.dataset.tab;
    flash = null;
    recOpen = null;
    render();
    $("main").scrollTop = 0;
    return;
  }
  const b = ev.target.closest("[data-act]");
  if (!b) return;
  if (b.dataset.confirm && needsConfirm(b)) return;
  const a = state.active,
    d = b.dataset,
    act = d.act;
  if (act === "pick") {
    picked.has(d.m) ? picked.delete(d.m) : picked.add(d.m);
    flash = null;
    render();
  } else if (act === "start") {
    state.active = {
      id: "w_" + Date.now().toString(36),
      start: Date.now(),
      muscles: MUSCLES.filter((m) => picked.has(m)),
      ex: [],
    };
    picked.clear();
    flash = null;
    saveDraft();
    sheet = { q: "", filter: state.active.muscles[0] || "All" };
    render();
  } else if (act === "plan-start") {
    const dy = PLAN.find((x) => x.id === d.id);
    state.active = {
      id: "w_" + Date.now().toString(36),
      start: Date.now(),
      plan: dy.id,
      muscles: [dy.name],
      ex: dy.ex.map((e) => {
        const st = [];
        for (let i = 0; i < e[1]; i++) st.push({ w: "", r: "", done: false });
        return { name: e[0], note: e[2], sets: st };
      }),
    };
    picked.clear();
    flash = null;
    saveDraft();
    render();
    $("main").scrollTop = 0;
  } else if (act === "abs-gym") {
    state.active = {
      id: "w_" + Date.now().toString(36),
      start: Date.now(),
      muscles: ["Core"],
      ex: ABSGYM.map((n) => ({ name: n, sets: mkSets(n) })),
    };
    picked.clear();
    flash = null;
    saveDraft();
    render();
    $("main").scrollTop = 0;
  } else if (act === "open-sheet") {
    sheet = { q: "", filter: (a && a.muscles[0]) || "All" };
    render();
  } else if (act === "close-sheet") {
    sheet = null;
    render();
  } else if (act === "filter") {
    sheet.filter = d.m;
    renderSheet();
  } else if (act === "add-ex") {
    addEx(d.n);
  } else if (act === "add-custom") {
    const name = $("cname").value.trim().slice(0, 60);
    if (!name) {
      $("cname").focus();
      return;
    }
    if (!allEx().some((e) => e[0].toLowerCase() === name.toLowerCase())) {
      state.custom.push({ name, muscle: $("cmuscle").value, type: $("ctype").value });
      mark("settings");
    }
    addEx(allEx().find((e) => e[0].toLowerCase() === name.toLowerCase())[0]);
  } else if (act === "add-set") {
    const s = a.ex[+d.ei].sets,
      p = s[s.length - 1];
    s.push({ w: p ? p.w : "", r: "", done: false });
    saveDraft();
    render();
  } else if (act === "rm-set") {
    a.ex[+d.ei].sets.pop();
    saveDraft();
    render();
  } else if (act === "rm-ex") {
    a.ex.splice(+d.ei, 1);
    saveDraft();
    render();
  } else if (act === "done") {
    const e = a.ex[+d.ei],
      s = e.sets[+d.si];
    if (s.done) {
      s.done = false;
      saveDraft();
      render();
      return;
    }
    const wi = $("w-" + d.ei + "-" + d.si),
      ri = $("r-" + d.ei + "-" + d.si);
    const w = num(s.w !== "" ? s.w : wi.placeholder),
      r = Math.round(num(s.r !== "" ? s.r : ri.placeholder));
    if (isNaN(w)) {
      wi.focus();
      return;
    }
    if (!(r > 0)) {
      ri.focus();
      return;
    }
    s.w = String(w);
    s.r = String(r);
    s.done = true;
    const nx = e.sets[+d.si + 1];
    if (nx && nx.w === "") nx.w = s.w;
    saveDraft();
    render();
    startTimer(state.rest);
  } else if (act === "finish") {
    finish();
  } else if (act === "discard") {
    state.active = null;
    stopTimer();
    saveDraft();
    render();
  } else if (act === "rec-open") {
    recOpen = d.id;
    flash = null;
    render();
    $("main").scrollTop = 0;
  } else if (act === "rec-back") {
    recOpen = null;
    render();
  } else if (act === "rec-start") {
    const r = routine(d.id);
    play = {
      r,
      tab: r.tab || "recover",
      steps: recSteps(r),
      i: 0,
      left: 0,
      end: 0,
      paused: false,
      start: Date.now(),
    };
    recOpen = null;
    flash = null;
    pGo(0);
    $("main").scrollTop = 0;
  } else if (act === "p-pause") {
    if (play.paused) {
      play.end = Date.now() + play.left * 1000;
      play.paused = false;
    } else {
      play.left = Math.max(1, Math.ceil((play.end - Date.now()) / 1000));
      play.paused = true;
    }
    render();
  } else if (act === "p-next") {
    const pz = play.paused;
    pGo(play.i + 1);
    if (play && pz) {
      play.paused = true;
      render();
    }
  } else if (act === "p-prev") {
    const pz = play.paused;
    pGo(play.i - 1);
    if (pz) {
      play.paused = true;
      render();
    }
  } else if (act === "p-end") {
    play = null;
    render();
  } else if (act === "easy-min") {
    easyMin = +d.v;
    render();
  } else if (act === "easy-log") {
    const now = Date.now();
    logRec(d.n, now - easyMin * 6e4, now);
    render();
    $("main").scrollTop = 0;
  } else if (act === "t-add") {
    tEnd += +d.v * 1000;
    tTotal = Math.max(tTotal + +d.v, 1);
    tick();
  } else if (act === "t-stop") {
    stopTimer();
  } else if (act === "cal-nav") {
    calM = new Date(calM.getFullYear(), calM.getMonth() + +d.v, 1);
    calDay = null;
    render();
  } else if (act === "cal-day") {
    calDay = calDay === d.k ? null : d.k;
    render();
  } else if (act === "del-w") {
    state.workouts = state.workouts.filter((w) => w.id !== d.id);
    pending.delete(d.id);
    mark("del:" + d.id);
    render();
  } else if (act === "rest") {
    state.rest = +d.v;
    mark("settings");
    render();
  } else if (act === "export") {
    const txt = JSON.stringify({
      app: "reppo",
      v: 1,
      workouts: state.workouts,
      custom: state.custom,
      rest: state.rest,
    });
    $("backup").value = txt;
    const ok = () => {
      $("bmsg").textContent = "Backup copied. Paste it into a note or email to yourself.";
    };
    const no = () => {
      $("backup").select();
      $("bmsg").textContent = "Copy the text in the box above and keep it somewhere safe.";
    };
    try {
      navigator.clipboard.writeText(txt).then(ok, no);
    } catch (e) {
      no();
    }
  } else if (act === "import") {
    try {
      const o = JSON.parse($("backup").value);
      if (!o || !Array.isArray(o.workouts)) throw 0;
      const ids = new Set(state.workouts.map((w) => w.id));
      let n = 0;
      o.workouts.forEach((w) => {
        if (w && w.id && Array.isArray(w.ex) && !ids.has(w.id)) {
          state.workouts.push(w);
          pending.add(w.id);
          n++;
        }
      });
      (o.custom || []).forEach((c) => {
        if (c && c.name && !allEx().some((e) => e[0] === c.name)) {
          state.custom.push(c);
          pending.add("settings");
        }
      });
      state.workouts.sort((x, y) => x.start - y.start);
      saveLocal();
      flush();
      render();
      $("bmsg").textContent = "Restored " + n + (n === 1 ? " workout." : " workouts.");
    } catch (e) {
      $("bmsg").textContent = "That text is not a valid Reppo backup. Paste the full text from Copy backup.";
    }
  }
});
function mkSets(name) {
  const l = lastSets(name),
    n = l ? Math.min(l.sets.length, 6) : 3,
    sets = [];
  for (let i = 0; i < n; i++) sets.push({ w: "", r: "", done: false });
  return sets;
}
function addEx(name) {
  state.active.ex.push({ name, sets: mkSets(name) });
  sheet = null;
  saveDraft();
  render();
  const m = $("main");
  m.scrollTop = m.scrollHeight;
}
function finish() {
  const a = state.active;
  const ex = a.ex
    .map((e) => ({ name: e.name, sets: e.sets.filter((s) => s.done).map((s) => ({ w: +s.w, r: +s.r })) }))
    .filter((e) => e.sets.length);
  if (!ex.length) {
    flash = null;
    const b = document.querySelector('[data-act="finish"]');
    b.textContent = "Log a set first";
    setTimeout(() => {
      if (b.isConnected) b.textContent = "Finish";
    }, 1800);
    return;
  }
  let prs = 0;
  ex.forEach((e) => {
    const prev = bestE(e.name),
      now = Math.max(...e.sets.map((s) => e1rm(s.w, s.r)));
    if (prev > 0 && now > prev + 1e-9) prs++;
  });
  const muscles = a.muscles.length
    ? a.muscles
    : MUSCLES.filter((m) => ex.some((e) => exInfo(e.name)[1] === m));
  const w = { id: a.id, start: a.start, end: Date.now(), muscles, ex };
  if (a.plan) w.plan = a.plan;
  state.workouts.push(w);
  state.active = null;
  stopTimer();
  pending.add("active");
  mark(w.id);
  flash =
    "Workout saved: " +
    setCount(w) +
    (setCount(w) === 1 ? " set, " : " sets, ") +
    fmt(Math.round(volume(w))) +
    " kg lifted" +
    (prs ? ", " + prs + (prs === 1 ? " new record" : " new records") : "") +
    ".";
  render();
  $("main").scrollTop = 0;
}
document.addEventListener("input", (ev) => {
  const t = ev.target;
  if (t.dataset.f && state.active) {
    state.active.ex[+t.dataset.ei].sets[+t.dataset.si][t.dataset.f] = t.value.trim();
    saveLocal();
    pending.add("active");
    clearTimeout(draftTimer);
    draftTimer = setTimeout(flush, 2500);
  } else if (t.id === "q") {
    sheet.q = t.value;
    renderSheet();
  }
});
document.addEventListener("change", (ev) => {
  if (ev.target.id === "progSel") {
    progEx = ev.target.value;
    render();
  }
});

/* ---------- boot ---------- */
if (typeof document !== "undefined" && document.getElementById("main")) {
  loadLocal();
  render();
  initCloud();
}

/* ---------- installable app ---------- */
if (typeof navigator !== "undefined") {
  try {
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
  } catch (e) {}
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }
}
