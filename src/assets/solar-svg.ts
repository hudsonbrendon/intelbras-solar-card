import { svg, type TemplateResult } from "lit";

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

/**
 * Inline illustration: a roof with a 2x4 PV array, a small sun (moon at night).
 *
 * Animated parts carry classes targeted by styles.ts: `.sun-rays`, `.sun`,
 * `.shine`, `.moon`, `.star`, `.warn`. Colours come from CSS variables so
 * themes and dark mode restyle it.
 */
export function solarSvg(state: string): TemplateResult {
  return svg`
    <svg class="solar ${state}" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"
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
      </defs>

      <!-- shadow -->
      <ellipse cx="160" cy="188" rx="136" ry="7" fill="rgba(0,0,0,0.12)" />

      <!-- sky: sun by day, moon at night -->
      <g class="sun">
        <g class="sun-rays" stroke-width="2.4" stroke-linecap="round">
          <line x1="282" y1="10" x2="282" y2="15" /><line x1="282" y1="45" x2="282" y2="50" />
          <line x1="262" y1="30" x2="267" y2="30" /><line x1="297" y1="30" x2="302" y2="30" />
          <line x1="268" y1="16" x2="271.5" y2="19.5" /><line x1="292.5" y1="40.5" x2="296" y2="44" />
          <line x1="268" y1="44" x2="271.5" y2="40.5" /><line x1="292.5" y1="19.5" x2="296" y2="16" />
        </g>
        <circle class="sun-core" cx="282" cy="30" r="10" />
      </g>
      <g class="moon">
        <path d="M286 18 a12 12 0 1 0 8 20 a9.5 9.5 0 1 1 -8 -20 z" />
        <circle class="star" cx="246" cy="18" r="1.4" />
        <circle class="star s2" cx="304" cy="54" r="1.1" />
        <circle class="star s3" cx="262" cy="46" r="1" />
      </g>

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

      <!-- fault sign over the ridge -->
      <g class="warn">
        <path d="M160 24 l13 22 h-26 z" fill="var(--isc-error)" />
        <rect x="158.7" y="30.5" width="2.6" height="8" rx="1" fill="#fff" />
        <circle cx="160" cy="42" r="1.5" fill="#fff" />
      </g>
    </svg>
  `;
}
