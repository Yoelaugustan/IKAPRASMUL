import Image from "next/image";
import { Landmark } from "lucide-react";
import { EXECUTIVE_BOARD } from "@/data/about";

const HUB = { top: "50%", left: "50%" };

// The map's own marker dots (detected by scanning dotted-world-map.png for
// pixels brighter than the surrounding dot texture) sit at uneven angles and
// distances from the hub — several cluster in the same quadrant, which reads
// as cramped and makes pins overlap once photos are layered on. Instead,
// each continent keeps its real *angular position* around the hub (so the
// left-to-right, clockwise arrangement still roughly matches the globe —
// Americas left, Africa/Europe top, Asia/Australia right) but pins are
// redistributed to be evenly spaced by angle and sit on a shared ellipse, so
// no two ever crowd each other.
const CONTINENT_ANGLES = [
  220, // North America
  340, // East Asia
  300, // Europe
  260, // North Africa / Middle East
  100, // East Africa
  20, // Southeast Asia
  60, // Australia / Indonesia
  140, // Southern Africa
  180, // South America
];
const RADIUS_X = 40;
const RADIUS_Y = 34;

const PINS = CONTINENT_ANGLES.map((deg) => {
  const rad = (deg * Math.PI) / 180;
  return {
    left: `${50 + RADIUS_X * Math.cos(rad)}%`,
    top: `${50 + RADIUS_Y * Math.sin(rad)}%`,
  };
});

// A subset of pins get a thin gold ring instead of white, echoing the
// reference's mixed accent — a small, deliberate irregularity rather than a
// uniform grid of identical dots. Indonesia/Australia is always gold, since
// that pin sits nearest IKAPRASMUL's own home base.
const GOLD_RING_INDEXES = new Set([1, 3, 6]);

// Which node dot (the nearer-to-pin sample on each spoke) gets a gold
// accent. North Africa/Middle East previously had both of its dots gold,
// which crowded two gold accents right next to each other; it now gets one,
// and North America gets one too so the gold accents spread across the map
// instead of clustering.
const GOLD_NODE_SPOKES = new Set([0, 1, 3, 6]);

function pct(v: string) {
  return parseFloat(v);
}

// Quadratic-bezier point at parameter t, used to place a node dot exactly on
// each curved connector rather than guessing a position.
function bezierPoint(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  t: number,
) {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

// A gentle curve between two points, bowing left/right of the straight line
// so every connector — hub spokes, pin-to-pin mesh links, and node-to-node
// links alike — reads as a hand-drawn web rather than flat straight lines.
function curvedPath(
  p0: { x: number; y: number },
  p2: { x: number; y: number },
  bowSign: 1 | -1,
  bowFactor = 0.14,
) {
  const mid = { x: (p0.x + p2.x) / 2, y: (p0.y + p2.y) / 2 };
  const dx = p2.x - p0.x;
  const dy = p2.y - p0.y;
  const len = Math.hypot(dx, dy) || 1;
  const bow = bowSign * len * bowFactor;
  const p1 = {
    x: mid.x + (-dy / len) * bow,
    y: mid.y + (dx / len) * bow,
  };
  return { p0, p1, p2, path: `M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}` };
}

function connectorFor(pin: { top: string; left: string }, i: number) {
  const p0 = { x: pct(HUB.left), y: pct(HUB.top) };
  const p2 = { x: pct(pin.left), y: pct(pin.top) };
  return curvedPath(p0, p2, i % 2 === 0 ? 1 : -1);
}

// A handful of nearby pins linked directly to each other, layered under the
// hub connectors, so the graphic reads as a mesh instead of a single-source
// star. Indices follow the continent order in PINS above. North America -
// Europe is deliberately omitted: a straight (or even gently curved) line
// between them cuts right past the North Africa/Middle East pin, which sits
// angularly between the two.
const MESH_LINKS: [number, number][] = [
  [2, 3], // Europe - North Africa/Middle East
  [4, 7], // East Africa - Southern Africa
  [1, 5], // East Asia - Southeast Asia
  [5, 6], // Southeast Asia - Australia/Indonesia
  [7, 8], // Southern Africa - South America
];

// Small circle-only markers (no photo) studded along the connectors, so the
// graphic reads as a dense web rather than a handful of spokes. Rendered as
// real HTML circles (not SVG <circle>s) since the SVG's viewBox is stretched
// non-uniformly to match the wide container — an SVG circle would come out
// as an ellipse there, while a fixed-pixel div stays perfectly round.
function buildNodeMarkers(
  connectors: { p0: { x: number; y: number }; p1: { x: number; y: number }; p2: { x: number; y: number } }[],
  meshCurves: { p0: { x: number; y: number }; p1: { x: number; y: number }; p2: { x: number; y: number } }[],
) {
  const nodes: { x: number; y: number; gold: boolean; source: string }[] = [];
  connectors.forEach((c, i) => {
    const gold = GOLD_NODE_SPOKES.has(i);
    nodes.push({ ...bezierPoint(c.p0, c.p1, c.p2, 0.32), gold, source: `spoke-${i}` });
    nodes.push({ ...bezierPoint(c.p0, c.p1, c.p2, 0.68), gold: false, source: `spoke-${i}` });
  });
  meshCurves.forEach((c, i) => {
    nodes.push({ ...bezierPoint(c.p0, c.p1, c.p2, 0.5), gold: false, source: `mesh-${i}` });
  });
  return nodes;
}

// Connects each node marker to its single nearest neighbour (deduped), so
// the small dots read as their own fine web rather than floating unattached
// on top of the main hub/mesh lines. Skips pairs sampled from the same
// connector — two points on the same curve are always close to each other,
// and a straight chord between them would just cut across their own curve.
function buildNodeLinks(nodes: { x: number; y: number; source: string }[]) {
  const links: [number, number][] = [];
  const seen = new Set<string>();
  nodes.forEach((n, i) => {
    let bestJ = -1;
    let bestDist = Infinity;
    nodes.forEach((m, j) => {
      if (i === j || m.source === n.source) return;
      const dist = Math.hypot(n.x - m.x, n.y - m.y);
      if (dist < bestDist) {
        bestDist = dist;
        bestJ = j;
      }
    });
    if (bestJ === -1) return;
    const key = i < bestJ ? `${i}-${bestJ}` : `${bestJ}-${i}`;
    if (!seen.has(key)) {
      seen.add(key);
      links.push([i, bestJ]);
    }
  });
  return links;
}

const LINE_STYLE = {
  stroke: "#13294b",
  strokeOpacity: 0.45,
  strokeWidth: 0.45,
} as const;

export function WorldMapGraphic() {
  const photos = EXECUTIVE_BOARD.slice(0, PINS.length);
  const connectors = PINS.map((p, i) => connectorFor(p, i));
  const meshCurves = MESH_LINKS.map(([a, b], i) => {
    const p0 = { x: pct(PINS[a].left), y: pct(PINS[a].top) };
    const p2 = { x: pct(PINS[b].left), y: pct(PINS[b].top) };
    return curvedPath(p0, p2, i % 2 === 0 ? 1 : -1, 0.18);
  });
  const nodeMarkers = buildNodeMarkers(connectors, meshCurves);
  const nodeLinks = buildNodeLinks(nodeMarkers);

  return (
    <div className="relative aspect-[1344/799] w-full overflow-hidden rounded-2xl bg-slate-50">
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: "url(/images/about/dotted-world-map.png)" }}
      />

      {/* Connectors sit at the base of the stack — the dots and photo pins
          layered below in the DOM (z-10) always paint on top of every line,
          including ones that pass close to a pin. */}
      <svg
        className="absolute inset-0 z-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {meshCurves.map((c, i) => (
          <path key={`mesh-${i}`} d={c.path} fill="none" {...LINE_STYLE} vectorEffect="non-scaling-stroke" />
        ))}

        {connectors.map((c, i) => (
          <path key={`spoke-${i}`} d={c.path} fill="none" {...LINE_STYLE} vectorEffect="non-scaling-stroke" />
        ))}

        {nodeLinks.map(([a, b], i) => {
          const c = curvedPath(nodeMarkers[a], nodeMarkers[b], i % 2 === 0 ? 1 : -1, 0.12);
          return (
            <path key={`node-link-${i}`} d={c.path} fill="none" {...LINE_STYLE} vectorEffect="non-scaling-stroke" />
          );
        })}
      </svg>

      {/* Web nodes — plain circle markers, no photo */}
      {nodeMarkers.map((n, i) => (
        <div
          key={`node-${i}`}
          className={`absolute z-10 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
            n.gold ? "bg-gold" : "bg-primary"
          }`}
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        />
      ))}

      {/* Central hub */}
      <div
        className="absolute z-10 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary shadow-lg ring-4 ring-white sm:size-16"
        style={{ top: HUB.top, left: HUB.left }}
      >
        <Landmark className="size-6 text-gold sm:size-7" strokeWidth={1.75} />
      </div>

      {/* Alumni pins */}
      {PINS.map((p, i) => {
        const member = photos[i % photos.length];
        const gold = GOLD_RING_INDEXES.has(i);
        return (
          <div
            key={i}
            className={`absolute z-10 size-9 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full shadow-md ring-2 sm:size-12 ${
              gold ? "ring-gold" : "ring-white"
            }`}
            style={{ top: p.top, left: p.left }}
          >
            <Image
              src={member.photo}
              alt=""
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
