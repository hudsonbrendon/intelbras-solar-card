import { svg, type TemplateResult } from "lit";
import type { SkyPosition, Weather } from "../helpers/sky";

// Roof plane seen from the front: ridge y=56 (x 84..236), eave y=148 (x 28..292).
// P(u, v) maps a point of the plane (u across, v down, both 0..1) to the SVG.
function p(u: number, v: number): string {
  const y = 56 + 92 * v;
  const xl = 84 - 56 * v;
  const xr = 236 + 56 * v;
  return `${(xl + (xr - xl) * u).toFixed(1)},${y.toFixed(1)}`;
}

function quad(u0: number, v0: number, u1: number, v1: number): string {
  return `${p(u0, v0)} ${p(u1, v0)} ${p(u1, v1)} ${p(u0, v1)}`;
}

const COLS = 4;
const ROWS = 2;
const U0 = 0.08;
const V0 = 0.14;
const GAP_U = 0.02;
const GAP_V = 0.06;
const W = (0.84 - GAP_U * (COLS - 1)) / COLS;
const H = (0.72 - GAP_V * (ROWS - 1)) / ROWS;

const PANELS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const u0 = U0 + (i % COLS) * (W + GAP_U);
  const v0 = V0 + Math.floor(i / COLS) * (H + GAP_V);
  return { u0, v0, u1: u0 + W, v1: v0 + H };
});

const panel = ({ u0, v0, u1, v1 }: (typeof PANELS)[number]): TemplateResult => {
  const um = (u0 + u1) / 2;
  const va = v0 + (v1 - v0) / 3;
  const vb = v0 + (2 * (v1 - v0)) / 3;
  return svg`
    <polygon class="cell" points="${quad(u0, v0, u1, v1)}" />
    <g class="cell-lines">
      <polyline points="${p(um, v0)} ${p(um, v1)}" />
      <polyline points="${p(u0, va)} ${p(u1, va)}" />
      <polyline points="${p(u0, vb)} ${p(u1, vb)}" />
    </g>
  `;
};

const RAYS = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4;
  const c = Math.cos(a);
  const n = Math.sin(a);
  return svg`<line x1="${(15 * c).toFixed(1)}" y1="${(15 * n).toFixed(1)}" x2="${(20 * c).toFixed(1)}" y2="${(20 * n).toFixed(1)}" />`;
});

// Cloud: outline drawn by a thicker copy behind a filled copy (clean union of circles).
const cloud = (cls: string, x: number, y: number, scale = 1): TemplateResult => svg`
  <g class="cloud ${cls}" transform="translate(${x} ${y}) scale(${scale})">
    <g class="drift">
      <use href="#isc-cloud" class="cloud-outline" />
      <use href="#isc-cloud" class="cloud-fill" />
    </g>
  </g>
`;

// [x, y, delay s, heavy-only]
const DROPS: Array<[number, number, number, boolean]> = [
  [62, 40, 0, false], [74, 44, -0.45, false], [86, 40, -0.2, true], [96, 42, -0.7, false],
  [146, 30, -0.3, false], [156, 34, -0.8, true], [166, 30, -0.1, false], [176, 32, -0.55, true],
  [222, 34, -0.65, false], [232, 36, -0.25, true], [242, 34, -0.9, false], [252, 36, -0.4, false],
  [68, 46, -0.85, true], [240, 40, -0.15, true],
];

const STARS: Array<[number, number, number, string]> = [
  [40, 22, 1.3, ""], [118, 12, 1.1, "s2"], [206, 20, 1.4, "s3"], [302, 44, 1.1, "s2"], [86, 44, 1, "s3"],
];

/**
 * Inline illustration: a roof with a 2x4 PV array under a sky that follows the
 * real sun (`sun.sun`) and weather.
 *
 * Animated parts carry classes targeted by styles.ts: `.body` (sun / moon on
 * its arc), `.sun-rays`, `.sun-glow`, `.shine`, `.cloud`, `.drop`, `.flake`,
 * `.bolt`, `.fog`, `.star`, `.warn`. Colours come from CSS variables so themes
 * and dark mode restyle it.
 */
export function solarSvg(state: string, weather: Weather = "clear", sky?: SkyPosition): TemplateResult {
  const x = sky?.x ?? 282;
  const y = sky?.y ?? 30;
  return svg`
    <svg class="solar ${state} wx-${weather}" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"
         role="img" aria-label="solar panels">
      <defs>
        <clipPath id="isc-panels-clip">
          ${PANELS.map((q) => svg`<polygon points="${quad(q.u0, q.v0, q.u1, q.v1)}" />`)}
        </clipPath>
        <linearGradient id="isc-shine-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0" />
          <stop offset="0.5" stop-color="#ffffff" stop-opacity="0.75" />
          <stop offset="1" stop-color="#ffffff" stop-opacity="0" />
        </linearGradient>
        <radialGradient id="isc-sun-glow">
          <stop offset="0" stop-color="#ffd54f" stop-opacity="0.85" />
          <stop offset="1" stop-color="#ffd54f" stop-opacity="0" />
        </radialGradient>
        <g id="isc-cloud">
          <circle cx="-12" cy="2" r="7" /><circle cx="0" cy="-4" r="10" /><circle cx="12" cy="1" r="8" />
          <rect x="-12" y="0" width="24" height="9" />
        </g>
      </defs>

      <!-- shadow -->
      <ellipse cx="160" cy="188" rx="136" ry="7" fill="rgba(0,0,0,0.12)" />

      <!-- stars (clear nights) -->
      <g class="stars">
        ${STARS.map(([sx, sy, r, c]) => svg`<circle class="star ${c}" cx="${sx}" cy="${sy}" r="${r}" />`)}
      </g>

      <!-- sun by day, moon by night, on an arc that follows the real sun -->
      <g class="body" style="transform: translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)">
        <g class="sun">
          <circle class="sun-glow" r="24" fill="url(#isc-sun-glow)" />
          <g class="sun-rays" stroke-width="2.4" stroke-linecap="round">${RAYS}</g>
          <circle class="sun-core" r="10" />
        </g>
        <g class="moon"><path d="M4 -12 a12 12 0 1 0 8 20 a9.5 9.5 0 1 1 -8 -20 z" /></g>
        ${cloud("c-near", 16, 10, 1)}
      </g>

      <!-- weather -->
      ${cloud("c1", 80, 30, 1.3)} ${cloud("c2", 160, 20, 1.15)} ${cloud("c3", 238, 26, 1.4)}
      <polygon class="bolt" points="166,30 159,44 165,44 160,56 173,40 167,40 171,30" />
      <!-- wall under the eave -->
      <rect x="48" y="156" width="224" height="26" fill="var(--isc-wall)"
            stroke="var(--isc-outline)" stroke-width="1.2" />

      <!-- roof plane, ridge and eave -->
      <polygon points="84,56 236,56 292,148 28,148" fill="var(--isc-roof)"
               stroke="var(--isc-outline)" stroke-width="1.5" stroke-linejoin="round" />
      <rect x="22" y="146" width="276" height="10" rx="3" fill="var(--isc-roof-dark)"
            stroke="var(--isc-outline)" stroke-width="1.2" />
      <line x1="80" y1="56" x2="240" y2="56" stroke="var(--isc-outline)" stroke-width="3"
            stroke-linecap="round" />

      <!-- PV array -->
      <g class="panels" stroke-linejoin="round">${PANELS.map(panel)}</g>
      <g clip-path="url(#isc-panels-clip)">
        <rect class="shine" x="-60" y="50" width="56" height="110" fill="url(#isc-shine-grad)" />
      </g>

      <!-- precipitation and fog fall in front of the roof -->
      <g class="rain">
        ${DROPS.map(([dx, dy, d, heavy]) => svg`<line class="drop ${heavy ? "heavy" : ""}" x1="${dx}" y1="${dy}" x2="${dx - 2}" y2="${dy + 8}" style="animation-delay:${d}s" />`)}
      </g>
      <g class="snow">
        ${DROPS.map(([dx, dy, d]) => svg`<circle class="flake" cx="${dx}" cy="${dy}" r="1.7" style="animation-delay:${d * 3}s" />`)}
      </g>
      <g class="fog">
        <line x1="40" y1="66" x2="196" y2="66" /><line x1="118" y1="78" x2="288" y2="78" />
        <line x1="30" y1="90" x2="210" y2="90" /><line x1="96" y1="102" x2="270" y2="102" />
      </g>

      <!-- fault sign over the ridge -->
      <g class="warn">
        <path d="M160 24 l13 22 h-26 z" fill="var(--isc-error)" />
        <rect x="158.7" y="30.5" width="2.6" height="8" rx="1" fill="#fff" />
        <circle cx="160" cy="42" r="1.5" fill="#fff" />
      </g>
    </svg>
  `;
}
