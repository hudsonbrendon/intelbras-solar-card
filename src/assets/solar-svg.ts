import { svg, type TemplateResult } from "lit";

const PANEL_LINES = (x0: number): TemplateResult => svg`
  <g class="panel-grid">
    <line x1="${x0 + 21}" y1="98" x2="${x0 + 9}" y2="138" />
    <line x1="${x0 + 41}" y1="98" x2="${x0 + 29}" y2="138" />
    <line x1="${x0 + 6}" y1="118" x2="${x0 + 67}" y2="118" />
  </g>
`;

/**
 * Inline illustration: sun/moon, two PV panels (MPPT1/MPPT2), the Intelbras
 * inverter and the house. Animated parts carry classes targeted by styles.ts
 * (`.sun-rays`, `.sun-glow`, `.moon`, `.glint`, `.flow`, `.led`, `.warn`).
 */
export function solarSvg(state: string): TemplateResult {
  return svg`
    <svg class="solar ${state}" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"
         role="img" aria-label="solar plant">
      <defs>
        <linearGradient id="isc-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--isc-panel-top)" />
          <stop offset="1" stop-color="var(--isc-panel-bottom)" />
        </linearGradient>
        <radialGradient id="isc-sun-glow">
          <stop offset="0" stop-color="#ffd54f" stop-opacity="0.9" />
          <stop offset="1" stop-color="#ffd54f" stop-opacity="0" />
        </radialGradient>
        <clipPath id="isc-panels-clip">
          <polygon points="30,98 92,98 82,138 18,138" />
          <polygon points="100,98 162,98 152,138 88,138" />
        </clipPath>
      </defs>

      <!-- sky: sun by day, moon and stars by night -->
      <g class="sun">
        <circle class="sun-glow" cx="52" cy="42" r="38" fill="url(#isc-sun-glow)" />
        <g class="sun-rays" stroke="#ffb300" stroke-width="3" stroke-linecap="round">
          <line x1="52" y1="12" x2="52" y2="18" /><line x1="52" y1="66" x2="52" y2="72" />
          <line x1="22" y1="42" x2="28" y2="42" /><line x1="76" y1="42" x2="82" y2="42" />
          <line x1="31" y1="21" x2="35" y2="25" /><line x1="69" y1="59" x2="73" y2="63" />
          <line x1="31" y1="63" x2="35" y2="59" /><line x1="69" y1="25" x2="73" y2="21" />
        </g>
        <circle class="sun-core" cx="52" cy="42" r="16" fill="#ffc107" />
      </g>
      <g class="moon">
        <path d="M60 26 a18 18 0 1 0 12 30 a14 14 0 1 1 -12 -30 z" fill="#cfd8dc" />
        <circle class="star" cx="100" cy="22" r="1.6" fill="#cfd8dc" />
        <circle class="star s2" cx="128" cy="40" r="1.2" fill="#cfd8dc" />
        <circle class="star s3" cx="22" cy="18" r="1.3" fill="#cfd8dc" />
      </g>

      <!-- ground -->
      <ellipse cx="160" cy="184" rx="148" ry="7" fill="rgba(0,0,0,0.1)" />
      <line x1="8" y1="172" x2="312" y2="172" stroke="var(--isc-outline)" stroke-width="1.5" />

      <!-- panel stands -->
      <g stroke="var(--isc-outline)" stroke-width="3" stroke-linecap="round">
        <line x1="50" y1="138" x2="50" y2="172" /><line x1="120" y1="138" x2="120" y2="172" />
      </g>

      <!-- PV panels -->
      <polygon class="panel" points="30,98 92,98 82,138 18,138" fill="url(#isc-panel)"
               stroke="var(--isc-frame)" stroke-width="2" />
      <polygon class="panel" points="100,98 162,98 152,138 88,138" fill="url(#isc-panel)"
               stroke="var(--isc-frame)" stroke-width="2" />
      <g stroke="var(--isc-frame)" stroke-width="1" opacity="0.6">
        ${PANEL_LINES(12)} ${PANEL_LINES(82)}
      </g>
      <g clip-path="url(#isc-panels-clip)">
        <polygon class="glint" points="10,138 22,98 34,98 22,138" fill="#ffffff" opacity="0" />
      </g>

      <!-- cables + energy flow -->
      <path class="cable" d="M150 138 Q 168 152 186 150" fill="none" />
      <path class="cable" d="M232 150 L254 150" fill="none" />
      <path class="flow" d="M150 138 Q 168 152 186 150" fill="none" />
      <path class="flow f2" d="M232 150 L254 150" fill="none" />

      <!-- inverter -->
      <rect x="186" y="98" width="46" height="62" rx="6" fill="var(--isc-inverter)"
            stroke="var(--isc-outline)" stroke-width="1.5" />
      <path d="M186 110 v-6 a6 6 0 0 1 6 -6 h34 a6 6 0 0 1 6 6 v6 z" fill="var(--isc-brand)" />
      <text x="209" y="107.5" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
            font-weight="700" font-size="7" fill="#ffffff">intelbras</text>
      <rect x="194" y="116" width="30" height="14" rx="2" fill="var(--isc-screen)" />
      <rect class="screen-bar" x="197" y="121" width="24" height="4" rx="1" fill="var(--isc-brand)" />
      <circle class="led" cx="209" cy="146" r="3.5" />
      <g class="warn">
        <path d="M209 64 l14 24 h-28 z" fill="var(--isc-error)" />
        <rect x="207.6" y="71" width="2.8" height="9" rx="1" fill="#fff" />
        <circle cx="209" cy="84" r="1.6" fill="#fff" />
      </g>

      <!-- house -->
      <polygon points="248,120 279,96 310,120" fill="var(--isc-roof)" />
      <rect x="254" y="120" width="50" height="40" fill="var(--isc-house)"
            stroke="var(--isc-outline)" stroke-width="1.2" />
      <rect x="273" y="138" width="12" height="22" fill="var(--isc-outline)" opacity="0.6" />
      <rect class="window" x="259" y="127" width="10" height="9" />
      <rect class="window" x="290" y="127" width="10" height="9" />
    </svg>
  `;
}
