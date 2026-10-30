import type { EntityKey } from "./const";

export interface StatConfig {
  entity?: string;
  key?: EntityKey;
  attribute?: string;
  unit?: string;
  subtitle?: string;
}

export interface ShortcutConfig {
  name?: string;
  icon?: string;
  service?: string;
  service_data?: Record<string, unknown>;
  target?: Record<string, unknown>;
  key?: EntityKey;
}

export interface SolarCardConfig {
  type: string;
  /** Device id of the inverter (or any device of the integration entry). */
  device?: string;
  entities?: Partial<Record<EntityKey, string>>;
  name?: string;
  /** weather.* entity driving clouds / rain / snow / fog (auto-detected when omitted). */
  weather_entity?: string;
  show_name?: boolean;
  show_status?: boolean;
  show_toolbar?: boolean;
  show_strings?: boolean;
  compact_view?: boolean;
  language?: string;
  stats?: Partial<Record<string, StatConfig[]>>;
  shortcuts?: ShortcutConfig[];
}

export type ResolvedEntities = Partial<Record<EntityKey, string>>;

export interface HassState {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface EntityRegistryEntry {
  entity_id: string;
  platform?: string;
  translation_key?: string;
  device_id?: string;
}

export interface DeviceRegistryEntry {
  id: string;
  name?: string;
  config_entries?: string[];
  primary_config_entry?: string;
}

export interface HassObject {
  states: Record<string, HassState>;
  entities?: Record<string, EntityRegistryEntry>;
  devices?: Record<string, DeviceRegistryEntry>;
  locale?: { language: string };
  language?: string;
  themes?: { darkMode?: boolean };
  formatEntityState?: (stateObj: HassState, state?: string) => string;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>
  ) => Promise<unknown>;
}
