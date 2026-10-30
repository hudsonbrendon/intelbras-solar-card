import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { solarSvg } from "./assets/solar-svg";
import { CARD_NAME, CARD_VERSION, PLATFORM, type EntityKey, type SolarState } from "./const";
import { computeState, loadRatio, numeric, resolveEntities } from "./helpers/resolve";
import { findWeather, skyPosition, weatherScene } from "./helpers/sky";
import { localize, resolveLanguage } from "./localize";
import { cardStyles } from "./styles";
import type {
  HassObject,
  HassState,
  ResolvedEntities,
  ShortcutConfig,
  SolarCardConfig,
  StatConfig,
} from "./types";

console.info(
  `%c INTELBRAS-SOLAR-CARD %c v${CARD_VERSION} `,
  "color: white; background: #00a335; font-weight: 700;",
  "color: white; background: #23272e; font-weight: 700;"
);

type Template = TemplateResult | typeof nothing;

const DEFAULT_STATS: Record<string, StatConfig[]> = {
  default: [
    { key: "energy_today", subtitle: "stat.energy_today" },
    { key: "energy_month", subtitle: "stat.energy_month" },
    { key: "energy_total", subtitle: "stat.energy_total" },
  ],
  night: [
    { key: "energy_today", subtitle: "stat.energy_today" },
    { key: "peak_power_today", subtitle: "stat.peak_power_today" },
    { key: "energy_total", subtitle: "stat.energy_total" },
  ],
};

function fireEvent(node: HTMLElement, type: string, detail?: unknown): void {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
}

@customElement(CARD_NAME)
export class IntelbrasSolarCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) public hass?: HassObject;
  @state() private _config!: SolarCardConfig;

  private _entities: ResolvedEntities = {};

  // ── HA card API ──────────────────────────────────────────────────────────
  static getStubConfig(hass?: HassObject): Partial<SolarCardConfig> {
    const entry = Object.values(hass?.entities ?? {}).find(
      (e) => e.platform === PLATFORM && e.translation_key === "work_state"
    );
    if (entry?.device_id) return { type: `custom:${CARD_NAME}`, device: entry.device_id };
    if (entry) return { type: `custom:${CARD_NAME}`, entities: { work_state: entry.entity_id } };
    return { type: `custom:${CARD_NAME}` };
  }

  static getConfigForm() {
    return {
      schema: [
        { name: "device", selector: { device: { filter: { integration: PLATFORM } } } },
        { name: "name", selector: { text: {} } },
        { name: "weather_entity", selector: { entity: { filter: { domain: "weather" } } } },
        {
          type: "grid",
          name: "",
          schema: [
            { name: "show_name", selector: { boolean: {} } },
            { name: "show_status", selector: { boolean: {} } },
            { name: "show_strings", selector: { boolean: {} } },
            { name: "show_toolbar", selector: { boolean: {} } },
            { name: "compact_view", selector: { boolean: {} } },
          ],
        },
      ],
      computeLabel: (schema: { name: string }) => localize(`editor.${schema.name}`),
    };
  }

  public setConfig(config: SolarCardConfig): void {
    if (!config) throw new Error(localize("common.invalid_config"));
    if (!config.device && !config.entities?.work_state) {
      throw new Error(localize("common.missing_entity"));
    }
    this._config = {
      show_name: true,
      show_status: true,
      show_toolbar: true,
      show_strings: true,
      compact_view: false,
      ...config,
    };
    this._entities = resolveEntities(this.hass, this._config);
  }

  public getCardSize(): number {
    return this._config?.compact_view ? 3 : 8;
  }

  public getGridOptions() {
    return this._config?.compact_view
      ? { columns: 6, rows: 3, min_columns: 4, min_rows: 2 }
      : { columns: 6, rows: 8, min_columns: 4, min_rows: 6 };
  }

  // ── lifecycle ────────────────────────────────────────────────────────────
  protected willUpdate(changed: PropertyValues): void {
    if (!changed.has("hass") || !this._config) return;
    const before = changed.get("hass") as HassObject | undefined;
    if (!before || before.entities !== this.hass?.entities || !this._entities.work_state) {
      this._entities = resolveEntities(this.hass, this._config);
    }
    if (!before || before.themes?.darkMode !== this.hass?.themes?.darkMode) {
      this.toggleAttribute("dark-mode", Boolean(this.hass?.themes?.darkMode));
    }
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has("_config")) return true;
    const before = changed.get("hass") as HassObject | undefined;
    if (!before || !this.hass) return true;
    const ids = [...Object.values(this._entities), "sun.sun", findWeather(this.hass, this._config.weather_entity)];
    return ids.some((id) => id && before.states[id] !== this.hass!.states[id]);
  }

  // ── helpers ──────────────────────────────────────────────────────────────
  private get _lang(): string {
    return resolveLanguage(this.hass, this._config?.language);
  }

  private _state(key: EntityKey): HassState | undefined {
    const id = this._entities[key];
    return id ? this.hass?.states[id] : undefined;
  }

  private _format(stateObj: HassState | undefined): string {
    if (!stateObj || stateObj.state === "unknown" || stateObj.state === "unavailable") return "—";
    if (this.hass?.formatEntityState) {
      try {
        return this.hass.formatEntityState(stateObj);
      } catch {
        /* fall through */
      }
    }
    const unit = stateObj.attributes.unit_of_measurement;
    return unit ? `${stateObj.state} ${unit}` : stateObj.state;
  }

  private _moreInfo(entityId?: string): void {
    const id = entityId ?? this._entities.ac_power ?? this._entities.work_state;
    if (id) fireEvent(this, "hass-more-info", { entityId: id });
  }

  private _press(key: EntityKey, confirmKey?: string): void {
    const id = this._entities[key];
    if (!id || !this.hass) return;
    if (confirmKey && !window.confirm(localize(confirmKey, this._lang))) return;
    void this.hass.callService("button", "press", { entity_id: id });
  }

  private _toggleLimit(): void {
    const limit = this._state("power_limit_enabled");
    if (!limit || !this.hass) return;
    const on = limit.state === "on";
    if (!window.confirm(localize(on ? "common.confirm_limit_off" : "common.confirm_limit_on", this._lang))) {
      return;
    }
    void this.hass.callService("switch", on ? "turn_off" : "turn_on", { entity_id: limit.entity_id });
  }

  private _runShortcut(shortcut: ShortcutConfig): void {
    if (!this.hass) return;
    if (shortcut.key) {
      this._press(shortcut.key);
      return;
    }
    if (!shortcut.service) return;
    const [domain, service] = shortcut.service.split(".");
    void this.hass.callService(domain, service, shortcut.service_data, shortcut.target);
  }

  // ── render ───────────────────────────────────────────────────────────────
  protected render(): Template {
    if (!this._config) return nothing;
    const solarState = computeState(this.hass, this._entities);
    if (solarState === "unavailable") return this._renderUnavailable();
    const load = loadRatio(this.hass, this._entities);
    const sky = skyPosition(this.hass);
    const weather = weatherScene(this.hass, findWeather(this.hass, this._config.weather_entity));
    const style =
      `--isc-load:${load.toFixed(2)};--isc-shine-duration:${(6.5 - load * 3.5).toFixed(2)}s;` +
      `--isc-sun-i:${sky.intensity.toFixed(2)}`;
    return html`
      <ha-card style=${style}>
        <div class="preview">
          <div class="header">
            <div class="tips">${this._renderTips()}</div>
            <ha-icon-button
              class="more-info"
              .label=${localize("common.more_info", this._lang)}
              @click=${() => this._moreInfo(this._entities.work_state)}
            >
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </ha-icon-button>
          </div>
          ${this._config.compact_view
            ? nothing
            : html`<div class="hero" @click=${() => this._moreInfo()}>${solarSvg(solarState, weather, sky)}</div>`}
          <div class="metadata">${this._renderName()} ${this._renderStatus(solarState, load)}</div>
          ${this._renderStrings(solarState)} ${this._renderStats(solarState)}
        </div>
        ${this._renderToolbar(solarState)}
      </ha-card>
    `;
  }

  private _renderUnavailable(): Template {
    return html`
      <ha-card>
        <div class="preview not-available">
          ${this._config.compact_view ? nothing : html`<div class="hero">${solarSvg("unavailable")}</div>`}
          <div class="metadata">
            <div class="status">${localize("common.not_available", this._lang)}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _tip(key: EntityKey, icon: string, cls = ""): Template {
    const stateObj = this._state(key);
    if (!stateObj) return nothing;
    return html`
      <div class="tip ${cls}" title=${String(stateObj.attributes.friendly_name ?? "")}
           @click=${() => this._moreInfo(stateObj.entity_id)}>
        <ha-icon icon=${icon}></ha-icon>
        <span>${this._format(stateObj)}</span>
      </div>
    `;
  }

  private _renderTips(): Template {
    const alarms = numeric(this.hass, this._entities.active_alarms) ?? 0;
    return html`
      ${this._tip("energy_today", "mdi:solar-power-variant", "energy")}
      ${this._tip("temperature", "mdi:thermometer")}
      ${this._tip("wifi_signal", "mdi:wifi")}
      ${alarms > 0
        ? html`<div class="tip alarm" @click=${() => this._moreInfo(this._entities.active_alarms)}>
            <ha-icon icon="mdi:alert"></ha-icon>
            <span>${localize("common.alarms", this._lang, { count: alarms })}</span>
          </div>`
        : nothing}
    `;
  }

  private _renderName(): Template {
    if (!this._config.show_name) return nothing;
    const device = this._config.device ? this.hass?.devices?.[this._config.device] : undefined;
    const name = this._config.name ?? device?.name ?? "Intelbras Solar";
    return html`<div class="plant-name">${name}</div>`;
  }

  private _renderStatus(solarState: SolarState, load: number): Template {
    if (!this._config.show_status) return nothing;
    const work = this._state("work_state");
    const text =
      work && this.hass?.formatEntityState && solarState !== "night"
        ? this._format(work)
        : localize(`status.${solarState}`, this._lang);
    const power = this._state("ac_power");
    const nominal = numeric(this.hass, this._entities.nominal_power);
    const showPower = power && solarState !== "night" && solarState !== "fault";
    return html`
      <div class="status ${solarState}"><span>${text}</span></div>
      ${showPower
        ? html`
            <div class="power" @click=${() => this._moreInfo(power.entity_id)}>${this._format(power)}</div>
            ${nominal
              ? html`<div class="load">
                  <div class="load-bar"><div class="load-fill" style="width:${(load * 100).toFixed(1)}%"></div></div>
                  <div class="load-text">
                    ${localize("common.of_nominal", this._lang, {
                      percent: Math.round(load * 100),
                      nominal: String(nominal).replace(".", this._lang.startsWith("pt") ? "," : "."),
                    })}
                  </div>
                </div>`
              : nothing}
          `
        : nothing}
    `;
  }

  private _renderStrings(solarState: SolarState): Template {
    if (this._config.compact_view || !this._config.show_strings) return nothing;
    if (solarState === "night" || solarState === "fault") return nothing;
    const strings = (
      [
        ["MPPT1", "mppt1_power", "mppt1_voltage"],
        ["MPPT2", "mppt2_power", "mppt2_voltage"],
      ] as const
    ).filter(([, p]) => this._entities[p]);
    if (!strings.length) return nothing;
    return html`
      <div class="strings">
        ${strings.map(
          ([label, p, v]) => html`
            <div class="string" @click=${() => this._moreInfo(this._entities[p])}>
              <ha-icon icon="mdi:solar-panel"></ha-icon>${label}
              <b>${this._format(this._state(p))}</b>${this._entities[v] ? html`· ${this._format(this._state(v))}` : nothing}
            </div>
          `
        )}
      </div>
    `;
  }

  private _renderStats(solarState: SolarState): Template {
    if (this._config.compact_view) return nothing;
    const configured = this._config.stats ?? {};
    const list =
      configured[solarState] ?? configured.default ?? DEFAULT_STATS[solarState] ?? DEFAULT_STATS.default;
    const blocks = list
      .map((stat) => {
        const entityId = stat.entity ?? (stat.key ? this._entities[stat.key] : undefined);
        const stateObj = entityId ? this.hass?.states[entityId] : undefined;
        if (!stateObj) return nothing;
        let value = this._format(stateObj);
        if (stat.attribute) value = String(stateObj.attributes[stat.attribute] ?? "—");
        else if (stat.unit) value = `${stateObj.state} ${stat.unit}`;
        const subtitle = stat.subtitle?.startsWith("stat.") ? localize(stat.subtitle, this._lang) : stat.subtitle ?? "";
        return html`
          <div class="stats-block" @click=${() => this._moreInfo(entityId)}>
            <div class="stats-value">${value}</div>
            <div class="stats-subtitle">${subtitle}</div>
          </div>
        `;
      })
      .filter((b) => b !== nothing);
    return blocks.length ? html`<div class="stats">${blocks}</div>` : nothing;
  }

  private _iconButton(key: EntityKey, icon: string, labelKey: string, confirmKey?: string): Template {
    if (!this._entities[key]) return nothing;
    const label = localize(labelKey, this._lang);
    return html`
      <ha-icon-button .label=${label} title=${label} @click=${() => this._press(key, confirmKey)}>
        <ha-icon icon=${icon}></ha-icon>
      </ha-icon-button>
    `;
  }

  private _renderToolbar(solarState: SolarState): Template {
    if (!this._config.show_toolbar) return nothing;
    const shortcuts = (this._config.shortcuts ?? []).map(
      (shortcut) => html`
        <ha-icon-button .label=${shortcut.name ?? ""} title=${shortcut.name ?? ""} @click=${() => this._runShortcut(shortcut)}>
          <ha-icon icon=${shortcut.icon ?? "mdi:flash"}></ha-icon>
        </ha-icon-button>
      `
    );
    const restart = this._iconButton("reboot_datalogger", "mdi:restart", "common.restart_datalogger", "common.confirm_restart");
    if (solarState === "fault") {
      const code = this._state("fault_code");
      return html`
        <div class="toolbar">
          <button class="text-button danger" @click=${() => this._moreInfo(this._entities.fault_code)}>
            <ha-icon icon="mdi:alert-circle"></ha-icon>
            ${localize("common.fault_code", this._lang, { code: code?.state ?? "?" })}
          </button>
          <div class="fill-gap"></div>
          ${restart} ${shortcuts}
        </div>
      `;
    }
    const limitSwitch = this._state("power_limit_enabled");
    const limitPercent = this._state("power_limit");
    const limitOn = limitSwitch?.state === "on";
    return html`
      <div class="toolbar">
        ${limitSwitch
          ? html`
              <button class="text-button ${limitOn ? "active" : ""}" @click=${() => this._toggleLimit()}>
                <ha-icon icon=${limitOn ? "mdi:speedometer-medium" : "mdi:speedometer"}></ha-icon>
                ${limitOn
                  ? localize("common.limit_on", this._lang, { percent: limitPercent ? Math.round(Number(limitPercent.state)) : "?" })
                  : localize("common.limit_off", this._lang)}
              </button>
            `
          : nothing}
        ${this._entities.power_limit
          ? html`<ha-icon-button .label=${localize("common.limit", this._lang)} title=${localize("common.limit", this._lang)}
              @click=${() => this._moreInfo(this._entities.power_limit)}>
              <ha-icon icon="mdi:tune-variant"></ha-icon>
            </ha-icon-button>`
          : nothing}
        ${this._iconButton("sync_clock", "mdi:clock-check-outline", "common.sync_clock")} ${restart}
        <div class="fill-gap"></div>
        ${shortcuts}
      </div>
    `;
  }
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_NAME,
  name: localize("common.name"),
  description: localize("common.description"),
  preview: true,
  documentationURL: "https://github.com/hudsonbrendon/intelbras-solar-card",
  getEntitySuggestion: (hass: HassObject, entityId: string) => {
    const entry = hass.entities?.[entityId];
    if (!entry || entry.platform !== PLATFORM || entry.translation_key !== "work_state") return null;
    return {
      config: entry.device_id
        ? { type: `custom:${CARD_NAME}`, device: entry.device_id }
        : { type: `custom:${CARD_NAME}`, entities: { work_state: entityId } },
    };
  },
});
