export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function collectAppData() {
  return {
    exportedAt: new Date().toISOString(),
    checkRecords: readStorage('posture.checkRecords', {}),
    customLinks: readStorage('posture.customLinks', {}),
    eightWeekCheckins: readStorage('posture.eightWeekCheckins', {}),
    programSettings: readStorage('posture.programSettings', {}),
    periodRecord: readStorage('posture.periodRecord', {}),
    weeklyReviews: readStorage('posture.weeklyReviews', {}),
  };
}
