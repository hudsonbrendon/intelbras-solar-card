import type { EntityRegistryEntry, HassObject, HassState } from "../../src/types";

export const INVERTER = "dev-inverter";
export const DATALOGGER = "dev-datalogger";
export const PLANT = "dev-plant";
export const ENTRY = "entry-1";
const P = "intelbras_solar_local";

export interface MockOpts {
  work_state?: string;
  ac_power?: string;
  online?: string;
  fault?: string;
  sun?: string;
  limit?: string;
  alarms?: string;
  withRegistry?: boolean;
  darkMode?: boolean;
  language?: string;
}

export interface MockHass extends HassObject {
  _calls: Array<{ domain: string; service: string; service_data?: Record<string, unknown> }>;
}

function s(id: string, state: string, attributes: Record<string, unknown> = {}): HassState {
  return { entity_id: id, state, attributes };
}

export function mockHass(opts: MockOpts = {}): MockHass {
  const defs: Array<[string, string, string, string, Record<string, unknown>?]> = [
    // [entity_id, translation_key, device, state, attributes]
    [`sensor.${P}_estado`, "work_state", INVERTER, opts.work_state ?? "running", { device_class: "enum" }],
    [`sensor.${P}_potencia_ac`, "ac_power", INVERTER, opts.ac_power ?? "1297", { unit_of_measurement: "W" }],
    [`sensor.${P}_potencia_dc`, "dc_power", INVERTER, "1408", { unit_of_measurement: "W" }],
    [`sensor.${P}_potencia_nominal`, "nominal_power", INVERTER, "5.0", { unit_of_measurement: "kW" }],
    [`sensor.${P}_energia_hoje`, "energy_today", INVERTER, "7.1", { unit_of_measurement: "kWh" }],
    [`sensor.${P}_energia_no_mes`, "energy_month", INVERTER, "779.3", { unit_of_measurement: "kWh" }],
    [`sensor.${P}_energia_total`, "energy_total", INVERTER, "15487.1", { unit_of_measurement: "kWh" }],
    [`sensor.${P}_temperatura_interna`, "temperature", INVERTER, "65.4", { unit_of_measurement: "°C" }],
    [`sensor.${P}_mppt1_potencia`, "mppt1_power", INVERTER, "621", { unit_of_measurement: "W" }],
    [`sensor.${P}_mppt1_tensao`, "mppt1_voltage", INVERTER, "177.3", { unit_of_measurement: "V" }],
    [`sensor.${P}_mppt2_potencia`, "mppt2_power", INVERTER, "666", { unit_of_measurement: "W" }],
    [`sensor.${P}_alarmes_ativos`, "active_alarms", INVERTER, opts.alarms ?? "0"],
    [`sensor.${P}_codigo_de_falha`, "fault_code", INVERTER, "0"],
    [`binary_sensor.${P}_online`, "online", INVERTER, opts.online ?? "on"],
    [`binary_sensor.${P}_falha`, "fault", INVERTER, opts.fault ?? "off"],
    [`switch.${P}_limitacao_de_potencia`, "power_limit_enabled", INVERTER, opts.limit ?? "on"],
    [`number.${P}_limite_de_potencia`, "power_limit", INVERTER, "100.0", { unit_of_measurement: "%" }],
    [`button.${P}_sincronizar_relogio_do_inversor`, "sync_clock", INVERTER, "unknown"],
    [`button.${P}_datalogger_reiniciar`, "reboot_datalogger", DATALOGGER, "unknown"],
    [`sensor.${P}_datalogger_sinal_wi_fi`, "wifi_signal", DATALOGGER, "-38", { unit_of_measurement: "dBm" }],
    [`sensor.${P}_usina_pico_de_potencia_hoje`, "peak_power_today", PLANT, "4733", { unit_of_measurement: "W" }],
  ];
  const states: Record<string, HassState> = {};
  const entities: Record<string, EntityRegistryEntry> = {};
  for (const [id, tk, device, state, attrs] of defs) {
    states[id] = s(id, state, { friendly_name: id, ...(attrs ?? {}) });
    entities[id] = { entity_id: id, translation_key: tk, platform: P, device_id: device };
  }
  // an unrelated integration using the same translation_key must be ignored
  states["sensor.other_status"] = s("sensor.other_status", "x");
  entities["sensor.other_status"] = { entity_id: "sensor.other_status", translation_key: "work_state", platform: "other", device_id: "dev-x" };
  states["sun.sun"] = s("sun.sun", opts.sun ?? "above_horizon");

  const calls: MockHass["_calls"] = [];
  return {
    states,
    entities: opts.withRegistry === false ? undefined : entities,
    devices: {
      [INVERTER]: { id: INVERTER, name: "Intelbras Solar Local", config_entries: [ENTRY] },
      [DATALOGGER]: { id: DATALOGGER, name: "Datalogger", config_entries: [ENTRY] },
      [PLANT]: { id: PLANT, name: "Usina", config_entries: [ENTRY] },
      "dev-x": { id: "dev-x", name: "Other", config_entries: ["entry-x"] },
    },
    locale: { language: opts.language ?? "en" },
    themes: { darkMode: opts.darkMode ?? false },
    formatEntityState: (o) =>
      o.attributes.device_class === "enum"
        ? o.state.charAt(0).toUpperCase() + o.state.slice(1)
        : `${o.state}${o.attributes.unit_of_measurement ? " " + o.attributes.unit_of_measurement : ""}`,
    callService(domain, service, service_data) {
      calls.push({ domain, service, service_data });
      return Promise.resolve();
    },
    _calls: calls,
  };
}
