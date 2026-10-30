export const CARD_NAME = "intelbras-solar-card";
export const CARD_VERSION = "0.1.0";

/** Integration whose entities the card resolves from the entity registry. */
export const PLATFORM = "intelbras_solar_local";

/** Card key -> `translation_key` set by the intelbras_solar_local integration. */
export const ENTITY_KEYS = {
  work_state: "work_state",
  ac_power: "ac_power",
  dc_power: "dc_power",
  nominal_power: "nominal_power",
  energy_today: "energy_today",
  energy_month: "energy_month",
  energy_year: "energy_year",
  energy_total: "energy_total",
  temperature: "temperature",
  efficiency: "efficiency",
  grid_voltage: "grid_voltage",
  grid_frequency: "grid_frequency",
  mppt1_power: "mppt1_power",
  mppt1_voltage: "mppt1_voltage",
  mppt2_power: "mppt2_power",
  mppt2_voltage: "mppt2_voltage",
  running_time_today: "running_time_today",
  active_alarms: "active_alarms",
  fault_code: "fault_code",
  producing: "producing",
  fault: "fault",
  online: "online",
  power_limit_enabled: "power_limit_enabled",
  power_limit: "power_limit",
  sync_clock: "sync_clock",
  reboot_datalogger: "reboot_datalogger",
  wifi_signal: "wifi_signal",
  plant_status: "plant_status",
  peak_power_today: "peak_power_today",
  specific_yield_today: "specific_yield_today",
  savings_today: "savings_today",
  co2_avoided: "co2_avoided",
  trees_saved: "trees_saved",
  installed_capacity: "installed_capacity",
} as const;

export type EntityKey = keyof typeof ENTITY_KEYS;

/** Visual states of the illustration (CSS classes on the SVG). */
export type SolarState =
  | "producing"
  | "limited"
  | "starting"
  | "standby"
  | "night"
  | "fault"
  | "unavailable";

/** work_state values reported by the inverter (Sungrow register 5038). */
export const PRODUCING_STATES = new Set(["running", "alarm_run", "derating_run", "dispatch_run"]);
export const STARTING_STATES = new Set(["starting", "initial_standby"]);
export const FAULT_STATES = new Set(["fault", "communication_fault", "emergency_stop"]);

