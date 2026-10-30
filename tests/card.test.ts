import { describe, it, expect, vi } from "vitest";
import "../src/intelbras-solar-card";
import { CARD_NAME } from "../src/const";
import { computeState, loadRatio, numeric, resolveEntities } from "../src/helpers/resolve";
import { localize } from "../src/localize";
import { findWeather, skyPosition, weatherScene } from "../src/helpers/sky";
import { INVERTER, mockHass, type MockOpts } from "./fixtures/hass";
import type { SolarCardConfig } from "../src/types";

interface CardEl extends HTMLElement {
  setConfig(c: SolarCardConfig): void;
  hass: ReturnType<typeof mockHass>;
  updateComplete: Promise<boolean>;
  getCardSize(): number;
  getGridOptions(): { rows: number };
}

const P = "intelbras_solar_local";

async function mount(config: Partial<SolarCardConfig>, opts: MockOpts = {}): Promise<CardEl> {
  const el = document.createElement(CARD_NAME) as CardEl;
  el.setConfig({ type: `custom:${CARD_NAME}`, ...config } as SolarCardConfig);
  el.hass = mockHass(opts);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

const $ = (el: CardEl, sel: string) => el.shadowRoot!.querySelector(sel);
const $$ = (el: CardEl, sel: string) => el.shadowRoot!.querySelectorAll(sel);

describe("registration and config", () => {
  it("registers the element, picker entry and suggestion", () => {
    expect(customElements.get(CARD_NAME)).toBeDefined();
    const entry = window.customCards!.find((c) => c.type === CARD_NAME) as Record<string, unknown>;
    const suggest = entry.getEntitySuggestion as (h: unknown, id: string) => unknown;
    expect(suggest(mockHass(), `sensor.${P}_estado`)).toEqual({ config: { type: `custom:${CARD_NAME}`, device: INVERTER } });
    expect(suggest(mockHass(), "sensor.other_status")).toBeNull();
    expect(suggest(mockHass(), `sensor.${P}_potencia_ac`)).toBeNull();
  });

  it("builds stub config and editor form", () => {
    const ctor = customElements.get(CARD_NAME) as unknown as {
      getStubConfig(h: unknown): Partial<SolarCardConfig>;
      getConfigForm(): { schema: unknown[]; computeLabel(s: { name: string }): string };
    };
    expect(ctor.getStubConfig(mockHass())).toEqual({ type: `custom:${CARD_NAME}`, device: INVERTER });
    expect(ctor.getStubConfig(undefined)).toEqual({ type: `custom:${CARD_NAME}` });
    expect(ctor.getConfigForm().computeLabel({ name: "device" })).toBe("Inverter device");
  });

  it("rejects configs without the inverter", () => {
    const el = document.createElement(CARD_NAME) as CardEl;
    expect(() => el.setConfig({ type: "x" })).toThrow(/device/);
    expect(() => el.setConfig(undefined as unknown as SolarCardConfig)).toThrow(/Invalid/);
  });

  it("reports sizes", async () => {
    expect((await mount({ device: INVERTER })).getGridOptions().rows).toBe(8);
    const compact = await mount({ device: INVERTER, compact_view: true });
    expect(compact.getCardSize()).toBe(3);
  });
});

describe("helpers", () => {
  it("resolves entities across the inverter, datalogger and plant devices", () => {
    const hass = mockHass();
    const e = resolveEntities(hass, { type: "x", device: INVERTER });
    expect(e.work_state).toBe(`sensor.${P}_estado`);
    expect(e.reboot_datalogger).toBe(`button.${P}_datalogger_reiniciar`);
    expect(e.peak_power_today).toBe(`sensor.${P}_usina_pico_de_potencia_hoje`);
    const all = resolveEntities(hass, { type: "x" });
    expect(all.work_state).toBe(`sensor.${P}_estado`); // other platform ignored
    expect(resolveEntities(hass, { type: "x", device: INVERTER, entities: { ac_power: "sensor.custom" } }).ac_power).toBe(
      "sensor.custom"
    );
    expect(resolveEntities(mockHass({ withRegistry: false }), { type: "x", device: INVERTER })).toEqual({});
  });

  it("computes the visual state", () => {
    const e = resolveEntities(mockHass(), { type: "x", device: INVERTER });
    expect(computeState(mockHass(), e)).toBe("producing");
    expect(computeState(mockHass({ work_state: "derating_run" }), e)).toBe("limited");
    expect(computeState(mockHass({ work_state: "starting" }), e)).toBe("starting");
    expect(computeState(mockHass({ work_state: "standby", ac_power: "0" }), e)).toBe("standby");
    expect(computeState(mockHass({ work_state: "standby", ac_power: "0", sun: "below_horizon" }), e)).toBe("night");
    expect(computeState(mockHass({ work_state: "fault" }), e)).toBe("fault");
    expect(computeState(mockHass({ fault: "on" }), e)).toBe("fault");
    expect(computeState(mockHass({ online: "off" }), e)).toBe("unavailable");
    expect(computeState(mockHass({ work_state: "unavailable" }), e)).toBe("unavailable");
    expect(computeState(undefined, e)).toBe("unavailable");
    expect(computeState(mockHass({ ac_power: "0" }), e)).toBe("standby");
  });

  it("computes the load ratio", () => {
    const e = resolveEntities(mockHass(), { type: "x", device: INVERTER });
    expect(loadRatio(mockHass(), e)).toBeCloseTo(0.2594, 3);
    expect(loadRatio(mockHass({ ac_power: "9000" }), e)).toBe(1);
    expect(loadRatio(mockHass(), {})).toBe(0);
    expect(numeric(mockHass(), "sensor.nope")).toBeNull();
  });
});

describe("rendering", () => {
  it("renders the producing card", async () => {
    const el = await mount({ device: INVERTER });
    expect($(el, "svg.solar")!.classList.contains("producing")).toBe(true);
    expect($(el, ".plant-name")!.textContent).toContain("Intelbras Solar Local");
    expect($(el, ".status")!.textContent).toContain("Running");
    expect($(el, ".power")!.textContent).toContain("1297 W");
    expect($(el, ".load-text")!.textContent).toContain("26% of 5 kW");
    expect(($(el, "ha-card") as HTMLElement).getAttribute("style")).toContain("--isc-load:0.26");
    expect([...$$(el, ".tip")].map((t) => t.textContent!.trim())).toEqual(["7.1 kWh", "65.4 °C", "-38 dBm"]);
    expect($$(el, ".string").length).toBe(2);
    expect($(el, ".string")!.textContent).toContain("621 W");
    expect([...$$(el, ".stats-value")].map((s) => s.textContent)).toEqual(["7.1 kWh", "779.3 kWh", "15487.1 kWh"]);
    expect($(el, ".toolbar .text-button")!.textContent).toContain("Power limit 100%");
    expect($$(el, ".toolbar ha-icon-button").length).toBe(3);
  });

  it("renders night, fault, limited and unavailable", async () => {
    const night = await mount({ device: INVERTER }, { work_state: "standby", ac_power: "0", sun: "below_horizon" });
    expect($(night, "svg.solar")!.classList.contains("night")).toBe(true);
    expect($(night, ".status")!.textContent).toContain("Night");
    expect($(night, ".power")).toBeNull();
    expect($(night, ".strings")).toBeNull();
    expect($$(night, ".stats-value")[1].textContent).toBe("4733 W");

    const fault = await mount({ device: INVERTER }, { work_state: "fault" });
    expect($(fault, ".status")!.classList.contains("fault")).toBe(true);
    expect($(fault, ".toolbar .text-button.danger")!.textContent).toContain("Fault code 0");

    const limited = await mount({ device: INVERTER }, { work_state: "derating_run" });
    expect($(limited, "svg.solar")!.classList.contains("limited")).toBe(true);

    const off = await mount({ device: INVERTER }, { online: "off" });
    expect($(off, ".preview.not-available")).not.toBeNull();
    expect($(off, ".toolbar")).toBeNull();
  });

  it("shows alarms, hides sections, custom stats, dark mode, portuguese", async () => {
    const el = await mount(
      { device: INVERTER, name: "Telhado", show_toolbar: false, show_strings: false, stats: { producing: [{ key: "temperature", subtitle: "Temp" }, { entity: "sensor.nope" }] } },
      { alarms: "2", darkMode: true }
    );
    expect($(el, ".plant-name")!.textContent).toContain("Telhado");
    expect($(el, ".tip.alarm")!.textContent).toContain("2 active alarms");
    expect($(el, ".toolbar")).toBeNull();
    expect($(el, ".strings")).toBeNull();
    expect($$(el, ".stats-block").length).toBe(1);
    expect(el.hasAttribute("dark-mode")).toBe(true);
    const compact = await mount({ device: INVERTER, compact_view: true });
    expect($(compact, ".hero")).toBeNull();
    const pt = await mount({ device: INVERTER, language: "pt-BR" });
    expect($(pt, ".load-text")!.textContent).toContain("26% de 5 kW");
    expect($(pt, ".toolbar .text-button")!.textContent).toContain("Limite de potência");
  });
});

describe("actions", () => {
  it("toggles the limit, presses buttons with confirmation, shortcuts and more-info", async () => {
    const el = await mount({
      device: INVERTER,
      shortcuts: [{ name: "Off", icon: "mdi:power", service: "switch.turn_off", service_data: { entity_id: "switch.x" } }],
    });
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(true);
    ($(el, ".toolbar .text-button") as HTMLButtonElement).click();
    expect(el.hass._calls[0]).toEqual({ domain: "switch", service: "turn_off", service_data: { entity_id: `switch.${P}_limitacao_de_potencia` } });
    const buttons = $$(el, ".toolbar ha-icon-button");
    (buttons[1] as HTMLElement).click(); // sync clock
    expect(el.hass._calls[1].service_data).toEqual({ entity_id: `button.${P}_sincronizar_relogio_do_inversor` });
    confirm.mockReturnValue(false);
    (buttons[2] as HTMLElement).click(); // restart datalogger, declined
    expect(el.hass._calls.length).toBe(2);
    confirm.mockReturnValue(true);
    (buttons[2] as HTMLElement).click();
    expect(el.hass._calls[2].service_data).toEqual({ entity_id: `button.${P}_datalogger_reiniciar` });
    (buttons[3] as HTMLElement).click(); // shortcut
    expect(el.hass._calls[3]).toEqual({ domain: "switch", service: "turn_off", service_data: { entity_id: "switch.x" } });
    confirm.mockRestore();

    const events: string[] = [];
    el.addEventListener("hass-more-info", (e) => events.push((e as CustomEvent).detail.entityId));
    ($(el, ".hero") as HTMLElement).click();
    ($(el, ".tip") as HTMLElement).click();
    (buttons[0] as HTMLElement).click(); // power limit number
    expect(events).toEqual([`sensor.${P}_potencia_ac`, `sensor.${P}_energia_hoje`, `number.${P}_limite_de_potencia`]);
  });

  it("re-renders when a tracked entity changes", async () => {
    const el = await mount({ device: INVERTER });
    el.hass = mockHass({ work_state: "standby", ac_power: "0", sun: "below_horizon" });
    await el.updateComplete;
    expect($(el, "svg.solar")!.classList.contains("night")).toBe(true);
  });

  it("localizes with fallbacks", () => {
    expect(localize("status.producing", "pt-BR")).toBe("Gerando");
    expect(localize("status.producing", "pt")).toBe("Gerando");
    expect(localize("status.producing", "de")).toBe("Producing");
    expect(localize("x.y")).toBe("x.y");
  });
});

describe("sky", () => {
  const H = 3_600_000;
  const noon = Date.parse("2026-10-30T15:00:00Z");
  const withSun = (state: string, attrs: Record<string, unknown>) => {
    const hass = mockHass();
    hass.states["sun.sun"] = { entity_id: "sun.sun", state, attributes: attrs };
    return hass;
  };

  it("maps weather conditions and finds the weather entity", () => {
    const hass = mockHass();
    expect(findWeather(hass)).toBeUndefined();
    hass.states["weather.z"] = { entity_id: "weather.z", state: "pouring", attributes: {} };
    hass.states["weather.a"] = { entity_id: "weather.a", state: "lightning-rainy", attributes: {} };
    expect(findWeather(hass)).toBe("weather.a");
    hass.states["weather.home"] = { entity_id: "weather.home", state: "cloudy", attributes: {} };
    expect(findWeather(hass)).toBe("weather.home");
    expect(findWeather(hass, "weather.z")).toBe("weather.z");
    expect(weatherScene(hass, "weather.z")).toBe("pour");
    expect(weatherScene(hass, "weather.a")).toBe("storm");
    expect(weatherScene(hass, "weather.home")).toBe("cloudy");
    expect(weatherScene(hass, "weather.none")).toBe("clear");
    expect(weatherScene(hass)).toBe("clear");
  });

  it("puts the sun on its arc from sun.sun", () => {
    // rose 6 h ago, sets in 6 h -> top of the arc, high elevation -> full intensity
    const top = skyPosition(
      withSun("above_horizon", {
        next_rising: new Date(noon + 18 * H).toISOString(),
        next_setting: new Date(noon + 6 * H).toISOString(),
        elevation: 80,
      }),
      noon
    );
    expect(top.x).toBeCloseTo(160);
    expect(top.y).toBeCloseTo(14);
    expect(top.intensity).toBe(1);
    // 1 h after sunrise, low elevation -> left, low, dim
    const early = skyPosition(
      withSun("above_horizon", {
        next_rising: new Date(noon + 23 * H).toISOString(),
        next_setting: new Date(noon + 11 * H).toISOString(),
        elevation: 10,
      }),
      noon
    );
    expect(early.x).toBeLessThan(60);
    expect(early.intensity).toBeLessThan(0.25);
    // night: the moon walks from sunset to sunrise, no sun intensity
    const night = skyPosition(
      withSun("below_horizon", {
        next_rising: new Date(noon + 3 * H).toISOString(),
        next_setting: new Date(noon + 15 * H).toISOString(),
      }),
      noon
    );
    expect(night.x).toBeGreaterThan(220);
    expect(night.intensity).toBe(0);
    // no sun entity: falls back to the clock
    const local = new Date(2026, 9, 30, 12, 0).getTime();
    const hass = mockHass();
    delete hass.states["sun.sun"];
    expect(skyPosition(hass, local).x).toBeCloseTo(160);
    expect(skyPosition(hass, local).intensity).toBeCloseTo(1);
    expect(skyPosition(undefined, new Date(2026, 9, 30, 0, 0).getTime()).intensity).toBe(0);
  });

  it("renders the weather scene and sun intensity", async () => {
    const el = await mount({ device: INVERTER, weather_entity: "weather.casa" });
    el.hass = mockHass();
    el.hass.states["weather.casa"] = { entity_id: "weather.casa", state: "rainy", attributes: {} };
    await el.updateComplete;
    expect($(el, "svg.solar")!.classList.contains("wx-rain")).toBe(true);
    expect(($(el, "ha-card") as HTMLElement).getAttribute("style")).toMatch(/--isc-sun-i:\d/);
    expect(($(el, ".body") as SVGElement).getAttribute("style")).toContain("translate(");
  });
});
