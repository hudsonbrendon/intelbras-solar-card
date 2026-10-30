import {
  ENTITY_KEYS,
  FAULT_STATES,
  PLATFORM,
  PRODUCING_STATES,
  STARTING_STATES,
  type EntityKey,
  type SolarState,
} from "../const";
import type { HassObject, ResolvedEntities, SolarCardConfig } from "../types";

const BY_TRANSLATION_KEY = new Map<string, EntityKey>(
  Object.entries(ENTITY_KEYS).map(([key, tk]) => [tk, key as EntityKey])
);

function entryIds(hass: HassObject, deviceId: string): Set<string> {
  const device = hass.devices?.[deviceId];
  return new Set(device?.config_entries ?? []);
}

/**
 * Map card keys to entity ids.
 *
 * The integration splits the plant into three devices (inverter, datalogger,
 * plant). With `device` set, every device sharing its config entry is used so
 * datalogger and plant entities are found too; without it, every entity of the
 * platform is used (single installation).
 */
export function resolveEntities(
  hass: HassObject | undefined,
  config: SolarCardConfig
): ResolvedEntities {
  const resolved: ResolvedEntities = {};
  const registry = hass?.entities;
  if (registry && hass) {
    let deviceIds: Set<string> | undefined;
    if (config.device) {
      const entries = entryIds(hass, config.device);
      deviceIds = new Set([config.device]);
      for (const device of Object.values(hass.devices ?? {})) {
        if ((device.config_entries ?? []).some((e) => entries.has(e))) deviceIds.add(device.id);
      }
    }
    for (const entry of Object.values(registry)) {
      if (entry.platform !== PLATFORM || !entry.translation_key) continue;
      if (deviceIds && (!entry.device_id || !deviceIds.has(entry.device_id))) continue;
      const key = BY_TRANSLATION_KEY.get(entry.translation_key);
      if (key && !resolved[key]) resolved[key] = entry.entity_id;
    }
  }
  return { ...resolved, ...(config.entities ?? {}) };
}

export function numeric(hass: HassObject | undefined, entityId?: string): number | null {
  if (!entityId || !hass) return null;
  const value = Number(hass.states[entityId]?.state);
  return Number.isFinite(value) ? value : null;
}

function isNight(hass: HassObject): boolean {
  return hass.states["sun.sun"]?.state === "below_horizon";
}

/** Derive the illustration state from work state, fault/online sensors and the sun. */
export function computeState(hass: HassObject | undefined, entities: ResolvedEntities): SolarState {
  if (!hass) return "unavailable";
  const work = entities.work_state ? hass.states[entities.work_state] : undefined;
  const online = entities.online ? hass.states[entities.online]?.state : undefined;
  if (!work || work.state === "unavailable" || online === "off") return "unavailable";
  const fault = entities.fault ? hass.states[entities.fault]?.state : undefined;
  if (FAULT_STATES.has(work.state) || fault === "on") return "fault";
  const power = numeric(hass, entities.ac_power) ?? 0;
  if (PRODUCING_STATES.has(work.state) && power > 0) {
    return work.state === "derating_run" ? "limited" : "producing";
  }
  if (STARTING_STATES.has(work.state)) return "starting";
  return isNight(hass) ? "night" : "standby";
}

/** AC power as a fraction (0-1) of the nominal power. */
export function loadRatio(hass: HassObject | undefined, entities: ResolvedEntities): number {
  const power = numeric(hass, entities.ac_power);
  const nominalKw = numeric(hass, entities.nominal_power);
  if (power === null || !nominalKw) return 0;
  return Math.max(0, Math.min(1, power / (nominalKw * 1000)));
}
