// Deterministic pseudo-random in [0, 1), seeded by index — same technique as
// PhotoConstellation's starfield. Keeps orbit geometry stable between server
// and client renders (a raw-precision-float hydration mismatch bit us there).
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export interface OrbitParams {
  rx: number;
  ry: number;
  rotateDeg: number;
  centerX: number; // px offset from the field's center — kept tiny on purpose
  centerY: number;
  durationS: number;
  delayS: number;
  reverse: boolean;
}

// A restrained set of scales, cycled by index, so the field reads as one
// designed instrument (a few deliberate sizes) rather than fully random
// dimensions. All flattened (rx notably larger than ry) — horizontal by
// default; only an occasional node gets a steeper tilt (see rotateDeg below).
const SCALES = [
  { rxMin: 130, rxMax: 160, ryMin: 55, ryMax: 80 }, // small
  { rxMin: 190, rxMax: 230, ryMin: 75, ryMax: 110 }, // medium
  { rxMin: 260, rxMax: 320, ryMin: 100, ryMax: 150 }, // large
];

// Every artifact gets its own ellipse — no shared "rings," so the field never
// implies a category grouping — but all of them stay centered on (almost)
// the same point as the central anchor, so they read as one orbital system
// with varied trajectories, not several unrelated ellipses scattered around.
export function getOrbitParams(index: number): OrbitParams {
  const scale = SCALES[index % SCALES.length];
  const rx = Number((scale.rxMin + pseudoRandom(index * 3.1) * (scale.rxMax - scale.rxMin)).toFixed(1));
  const ry = Number((scale.ryMin + pseudoRandom(index * 7.7 + 1) * (scale.ryMax - scale.ryMin)).toFixed(1));

  // Mostly a gentle tilt (horizontal-leaning); one in every ~5 gets a
  // steeper angle for a bit of variety without the field turning vertical.
  const rotateDeg =
    index % 5 === 0
      ? Number((50 + pseudoRandom(index * 5.3 + 2) * 20).toFixed(1))
      : Number(((pseudoRandom(index * 5.3 + 2) - 0.5) * 2 * 28).toFixed(1));

  // Deliberately tiny — every trajectory stays anchored to (almost) the same
  // shared center rather than visibly drifting off on its own.
  const centerX = Number(((pseudoRandom(index * 6.1 + 5) - 0.5) * 2 * 12).toFixed(1));
  const centerY = Number(((pseudoRandom(index * 4.8 + 6) - 0.5) * 2 * 8).toFixed(1));

  const durationS = Number((40 + pseudoRandom(index * 2.1 + 3) * 70).toFixed(1));
  const delayS = Number((-pseudoRandom(index * 9.4 + 4) * durationS).toFixed(1));
  const reverse = index % 2 === 1;
  return { rx, ry, rotateDeg, centerX, centerY, durationS, delayS, reverse };
}

// CSS `offset-path: ellipse(...)` combined with an ANCESTOR `transform: rotate()`
// doesn't compose correctly in practice (verified empirically — the moving
// element ends up well off the visible guide ellipse once the ancestor is
// rotated). Baking the rotation into the path's own geometry — using the SVG
// elliptical-arc command's x-axis-rotation parameter — sidesteps that
// entirely, since no ancestor transform is involved at all. Returns a CSS
// `path()`-ready string tracing the full (rotated) ellipse as two arcs.
export function getEllipsePathString(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rotateDeg: number,
): string {
  const rad = (rotateDeg * Math.PI) / 180;
  const x0 = Number((cx + rx * Math.cos(rad)).toFixed(2));
  const y0 = Number((cy + rx * Math.sin(rad)).toFixed(2));
  const x1 = Number((cx - rx * Math.cos(rad)).toFixed(2));
  const y1 = Number((cy - rx * Math.sin(rad)).toFixed(2));
  return `M ${x0} ${y0} A ${rx} ${ry} ${rotateDeg} 1 1 ${x1} ${y1} A ${rx} ${ry} ${rotateDeg} 1 1 ${x0} ${y0}`;
}
