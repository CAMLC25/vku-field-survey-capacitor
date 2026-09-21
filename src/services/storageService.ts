import { Preferences } from '@capacitor/preferences';

/**
 * Service for persistent, secure key-value preferences storage using @capacitor/preferences
 * Replaces or wraps localStorage for native Android/iOS security and durability across app updates.
 */
class StorageService {
  /**
   * Set string or object value
   */
  async set(key: string, value: any): Promise<void> {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      await Preferences.set({ key, value: stringValue });
    } catch (err) {
      console.warn(`[StorageService] Failed to set key "${key}":`, err);
      try {
        localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
      } catch (e) {
        // ignore
      }
    }
  }

  /**
   * Get value by key
   */
  async get<T = any>(key: string): Promise<T | null> {
    try {
      const { value } = await Preferences.get({ key });
      if (value === null) {
        // Check localStorage fallback
        const local = localStorage.getItem(key);
        if (local === null) return null;
        try {
          return JSON.parse(local) as T;
        } catch {
          return local as unknown as T;
        }
      }
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as unknown as T;
      }
    } catch (err) {
      console.warn(`[StorageService] Failed to get key "${key}":`, err);
      const local = localStorage.getItem(key);
      if (local === null) return null;
      try {
        return JSON.parse(local) as T;
      } catch {
        return local as unknown as T;
      }
    }
  }

  /**
   * Remove key
   */
  async remove(key: string): Promise<void> {
    try {
      await Preferences.remove({ key });
    } catch (err) {
      console.warn(`[StorageService] Failed to remove key "${key}":`, err);
    }
    localStorage.removeItem(key);
  }

  /**
   * Clear all stored preferences
   */
  async clear(): Promise<void> {
    try {
      await Preferences.clear();
    } catch (err) {
      console.warn('[StorageService] Failed to clear preferences:', err);
    }
    localStorage.clear();
  }
}

export const storageService = new StorageService();
