import { css } from "lit";

export const cardStyles = css`
  :host {
    --isc-background: var(--ha-card-background, var(--card-background-color, transparent));
    --isc-primary-text-color: var(--primary-text-color);
    --isc-secondary-text-color: var(--secondary-text-color);
    --isc-divider-color: var(--entities-divider-color, var(--divider-color));
    --isc-ok: var(--success-color, #43a047);
    --isc-warning: var(--warning-color, #ffa600);
    --isc-error: var(--error-color, #db4437);
    --isc-spacing: 10px;
    /* illustration palette (themes / card-mod can override) */
    --isc-sun: #ffb300;
    --isc-roof: #e9eaec;
    --isc-roof-dark: #cfd2d6;
    --isc-wall: #f6f7f8;
    --isc-cell: #c3c8ce;
    --isc-cell-night: #9ea4ab;
    --isc-cell-line: #ffffff;
    --isc-outline: #9aa0a6;
    --isc-load: 0;
    --isc-shine-duration: 5s;
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  :host([dark-mode]) {
    --isc-roof: #3a3f47;
    --isc-roof-dark: #2a2e34;
    --isc-wall: #4a4f58;
    --isc-cell: #262a30;
    --isc-cell-night: #1b1e22;
    --isc-cell-line: #4a4f58;
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
    color: var(--isc-sun);
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
  .solar .cell {
    fill: var(--isc-cell);
    stroke: var(--isc-outline);
    stroke-width: 1.2;
    transition: fill 0.6s ease;
  }
  .solar .cell-lines {
    fill: none;
    stroke: var(--isc-cell-line);
    stroke-width: 0.9;
    opacity: 0.8;
  }
  .solar .sun-core {
    fill: var(--isc-outline);
    transition: fill 0.6s ease;
  }
  .solar .sun-rays {
    stroke: var(--isc-outline);
    transform-origin: 282px 30px;
  }
  .solar .moon,
  .solar .warn,
  .solar .shine {
    opacity: 0;
  }
  .solar .moon path,
  .solar .star {
    fill: var(--isc-outline);
  }

  /* producing / limited: sun turns, a shine sweeps the array (faster with more power) */
  .solar.producing .sun-core,
  .solar.limited .sun-core,
  .solar.starting .sun-core {
    fill: var(--isc-sun);
  }
  .solar.producing .sun-rays,
  .solar.limited .sun-rays,
  .solar.starting .sun-rays {
    stroke: var(--isc-sun);
  }
  .solar.producing .sun-rays,
  .solar.limited .sun-rays {
    animation: spin 24s linear infinite;
  }
  .solar.producing .shine,
  .solar.limited .shine {
    animation: shine var(--isc-shine-duration) ease-in-out infinite;
  }
  /* starting: rays breathe */
  .solar.starting .sun-rays {
    animation: breathe 1.6s ease-in-out infinite;
  }
  /* night: moon + stars, darker cells */
  .solar.night .sun {
    opacity: 0;
  }
  .solar.night .moon {
    opacity: 1;
  }
  .solar.night .cell {
    fill: var(--isc-cell-night);
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
  /* fault: warning sign blinks over the ridge */
  .solar.fault .warn {
    opacity: 1;
    animation: breathe 1.2s ease-in-out infinite;
  }
  .solar.unavailable {
    opacity: 0.45;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes shine {
    0% {
      transform: translateX(0) skewX(-20deg);
      opacity: 0;
    }
    15% {
      opacity: 1;
    }
    70%,
    100% {
      transform: translateX(400px) skewX(-20deg);
      opacity: 0;
    }
  }
  @keyframes breathe {
    0%,
    100% {
      opacity: 0.4;
    }
    50% {
      opacity: 1;
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
    background: var(--isc-sun);
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
