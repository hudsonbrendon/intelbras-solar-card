import { css } from "lit";

export const cardStyles = css`
  :host {
    --isc-background: var(--ha-card-background, var(--card-background-color, transparent));
    --isc-primary-text-color: var(--primary-text-color);
    --isc-secondary-text-color: var(--secondary-text-color);
    --isc-divider-color: var(--entities-divider-color, var(--divider-color));
    --isc-accent: #ffb300;
    --isc-ok: var(--success-color, #43a047);
    --isc-warning: var(--warning-color, #ffa600);
    --isc-error: var(--error-color, #db4437);
    --isc-brand: #00a335;
    --isc-spacing: 10px;
    /* illustration palette (themes / card-mod can override) */
    --isc-panel-top: #2f5f9e;
    --isc-panel-bottom: #17345c;
    --isc-frame: #c9d3df;
    --isc-inverter: #f3f5f7;
    --isc-screen: #2b2f36;
    --isc-house: #fafafa;
    --isc-roof: #b0533c;
    --isc-outline: #9aa0a6;
    --isc-load: 0;
    --isc-flow-duration: 2s;
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  :host([dark-mode]) {
    --isc-frame: #6b7680;
    --isc-inverter: #3a3f47;
    --isc-house: #4a4f58;
    --isc-roof: #8a3f2d;
    --isc-outline: #6b7178;
  }

  ha-card {
    background: var(--isc-background);
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    overflow: hidden;
  }
  .preview {
    position: relative;
    text-align: center;
  }
  .preview.not-available {
    filter: grayscale(1);
  }

  /* ── header ─────────────────────────────────────────────────────────── */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .tips {
    display: flex;
    gap: var(--isc-spacing);
    flex-grow: 1;
    flex-wrap: wrap;
    align-items: center;
    padding: var(--isc-spacing);
    color: var(--isc-secondary-text-color);
    font-size: 0.95rem;
  }
  .tip {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    line-height: 1;
    white-space: nowrap;
  }
  .tip ha-icon {
    --mdc-icon-size: 18px;
  }
  .tip.energy ha-icon {
    color: var(--isc-accent);
  }
  .tip.alarm {
    color: var(--isc-warning);
  }
  .more-info {
    color: var(--isc-secondary-text-color);
    margin: 2px;
  }

  /* ── illustration ───────────────────────────────────────────────────── */
  .hero {
    display: block;
    margin: 0 auto;
    cursor: pointer;
    width: min(86%, 340px);
  }
  .solar {
    width: 100%;
    height: auto;
    overflow: visible;
  }
  .solar .moon,
  .solar .warn,
  .solar .flow {
    opacity: 0;
  }
  .solar .cable {
    stroke: var(--isc-outline);
    stroke-width: 3;
    stroke-linecap: round;
  }
  .solar .flow {
    stroke: var(--isc-accent);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-dasharray: 2 9;
  }
  .solar .panel-grid line {
    stroke: var(--isc-frame);
  }
  .solar .window {
    fill: #90a4ae;
  }
  .solar .led {
    fill: var(--isc-outline);
    transition: fill 0.4s ease;
  }
  .solar .sun-glow {
    opacity: calc(0.25 + var(--isc-load) * 0.75);
    transform-origin: 52px 42px;
  }
  .solar .sun-rays {
    transform-origin: 52px 42px;
  }

  /* producing: rays turn, energy flows (faster with more power), LED green */
  .solar.producing .sun-rays,
  .solar.limited .sun-rays {
    animation: spin 18s linear infinite;
  }
  .solar.producing .sun-glow,
  .solar.limited .sun-glow {
    animation: pulse 3s ease-in-out infinite;
  }
  .solar.producing .flow,
  .solar.limited .flow {
    opacity: 1;
    animation: flow var(--isc-flow-duration) linear infinite;
  }
  .solar.producing .glint,
  .solar.limited .glint {
    animation: glint 6s ease-in-out infinite;
  }
  .solar.producing .led {
    fill: var(--isc-ok);
    animation: breathe 2s ease-in-out infinite;
  }
  .solar.producing .window,
  .solar.limited .window {
    fill: #ffe082;
  }
  .solar.limited .led {
    fill: var(--isc-warning);
    animation: breathe 1.4s ease-in-out infinite;
  }
  .solar.limited .flow {
    stroke: var(--isc-warning);
  }
  /* starting: LED blinks, faint glow */
  .solar.starting .led {
    fill: var(--isc-ok);
    animation: blink 1s steps(2, start) infinite;
  }
  /* standby (day, not producing) */
  .solar.standby .sun-glow {
    opacity: 0.2;
  }
  /* night: moon + stars, panels dark */
  .solar.night .sun {
    opacity: 0;
  }
  .solar.night .moon {
    opacity: 1;
  }
  .solar.night .star {
    animation: twinkle 3s ease-in-out infinite;
  }
  .solar.night .s2 {
    animation-delay: 1s;
  }
  .solar.night .s3 {
    animation-delay: 2s;
  }
  .solar.night .panel {
    filter: brightness(0.6);
  }
  .solar.night .window {
    fill: #ffe082;
  }
  /* fault */
  .solar.fault .led {
    fill: var(--isc-error);
    animation: blink 0.8s steps(2, start) infinite;
  }
  .solar.fault .warn {
    opacity: 1;
    animation: breathe 1.2s ease-in-out infinite;
  }
  .solar.fault .sun-glow {
    opacity: 0.2;
  }
  .solar.unavailable {
    opacity: 0.45;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.12);
    }
  }
  @keyframes flow {
    to {
      stroke-dashoffset: -22;
    }
  }
  @keyframes glint {
    0%,
    60% {
      transform: translateX(0);
      opacity: 0;
    }
    70% {
      opacity: 0.35;
    }
    100% {
      transform: translateX(150px);
      opacity: 0;
    }
  }
  @keyframes breathe {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }
  @keyframes blink {
    to {
      opacity: 0.2;
    }
  }
  @keyframes twinkle {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .solar * {
      animation: none !important;
    }
  }

  /* ── metadata ───────────────────────────────────────────────────────── */
  .metadata {
    margin: var(--isc-spacing) auto;
  }
  .plant-name {
    text-align: center;
    font-weight: bold;
    color: var(--isc-primary-text-color);
    font-size: 16px;
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: var(--isc-secondary-text-color);
  }
  .status.fault {
    color: var(--isc-error);
  }
  .status.limited {
    color: var(--isc-warning);
  }
  .power {
    margin-top: 6px;
    font-size: 28px;
    font-weight: 500;
    color: var(--isc-primary-text-color);
    cursor: pointer;
  }
  .load {
    width: min(70%, 260px);
    margin: 6px auto 0;
  }
  .load-bar {
    height: 6px;
    border-radius: 3px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
    overflow: hidden;
  }
  .load-fill {
    height: 100%;
    border-radius: 3px;
    background: linear-gradient(90deg, #ffd54f, var(--isc-accent));
    transition: width 0.6s ease;
  }
  .load-text {
    margin-top: 4px;
    font-size: 0.8rem;
    color: var(--isc-secondary-text-color);
  }

  /* ── MPPT strings ───────────────────────────────────────────────────── */
  .strings {
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    margin: 0 var(--isc-spacing) var(--isc-spacing);
  }
  .string {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 14px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
    color: var(--isc-secondary-text-color);
    font-size: 0.85rem;
    cursor: pointer;
  }
  .string ha-icon {
    --mdc-icon-size: 16px;
    color: #2f5f9e;
  }
  .string b {
    color: var(--isc-primary-text-color);
    font-weight: 500;
  }

  /* ── stats ──────────────────────────────────────────────────────────── */
  .stats {
    border-top: 1px solid var(--isc-divider-color);
    display: flex;
    justify-content: space-evenly;
    color: var(--isc-secondary-text-color);
  }
  .stats-block {
    cursor: pointer;
    padding: var(--isc-spacing) 4px;
    text-align: center;
    border-right: 1px solid var(--isc-divider-color);
    flex-grow: 1;
    min-width: 0;
  }
  .stats-block:last-of-type {
    border-right: 0;
  }
  .stats-value {
    font-size: 20px;
    color: var(--isc-primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stats-subtitle {
    font-size: 0.85rem;
  }

  /* ── toolbar ────────────────────────────────────────────────────────── */
  .toolbar {
    min-height: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    padding: 5px;
    border-top: 1px solid var(--isc-divider-color);
  }
  .toolbar .fill-gap {
    flex-grow: 1;
  }
  .toolbar ha-icon-button {
    color: var(--isc-secondary-text-color);
    width: 44px;
    height: 44px;
    --mdc-icon-button-size: 44px;
  }
  .toolbar ha-icon-button ha-icon {
    display: flex;
  }
  .toolbar .text-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 0;
    background: transparent;
    color: var(--isc-secondary-text-color);
    font: inherit;
    padding: 12px 10px;
    cursor: pointer;
    border-radius: 8px;
  }
  .toolbar .text-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }
  .toolbar .text-button.active ha-icon {
    color: var(--isc-warning);
  }
  .toolbar .text-button.danger {
    color: var(--isc-error);
  }
  .toolbar .text-button ha-icon {
    --mdc-icon-size: 20px;
  }
`;
