import { Geolocation, type Position } from '@capacitor/geolocation';

export interface LocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number | null;
  timestamp: number;
  provider: 'capacitor' | 'browser' | 'mock';
}

/**
 * Service for acquiring device GPS coordinates with native Capacitor plugin
 * and fallback to Web HTML5 Geolocation API.
 */
class GeolocationService {
  /**
   * Request GPS permissions and obtain current coordinates.
   */
  async getCurrentPosition(): Promise<LocationResult> {
    try {
      // 1. Check and request permission on Capacitor
      const status = await Geolocation.checkPermissions();
      if (status.location !== 'granted') {
        const req = await Geolocation.requestPermissions({ permissions: ['location'] });
        if (req.location !== 'granted') {
          console.warn('[GeolocationService] Permission denied, attempting web fallback');
        }
      }

      // 2. Query high-accuracy GPS
      const pos: Position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000
      });

      return {
        latitude: Number(pos.coords.latitude.toFixed(6)),
        longitude: Number(pos.coords.longitude.toFixed(6)),
        accuracy: Math.round(pos.coords.accuracy),
        altitude: pos.coords.altitude,
        timestamp: pos.timestamp,
        provider: 'capacitor'
      };
    } catch (capError) {
      console.warn('[GeolocationService] Capacitor geolocation failed, trying navigator fallback:', capError);

      // 3. Fallback to HTML5 Geolocation
      if ('geolocation' in navigator) {
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              resolve({
                latitude: Number(pos.coords.latitude.toFixed(6)),
                longitude: Number(pos.coords.longitude.toFixed(6)),
                accuracy: Math.round(pos.coords.accuracy),
                altitude: pos.coords.altitude,
                timestamp: pos.timestamp,
                provider: 'browser'
              });
            },
            (err) => {
              console.warn('[GeolocationService] Browser geolocation error:', err.message);
              // Fallback to VKU Danang coordinates as gentle fallback
              resolve({
                latitude: 15.97526,
                longitude: 108.25324,
                accuracy: 50,
                timestamp: Date.now(),
                provider: 'mock'
              });
            },
            { enableHighAccuracy: true, timeout: 7000, maximumAge: 60000 }
          );
        });
      }

      // Default VKU Danang coordinates (Khu đô thị Đại học Đà Nẵng)
      return {
        latitude: 15.97526,
        longitude: 108.25324,
        accuracy: 100,
        timestamp: Date.now(),
        provider: 'mock'
      };
    }
  }
}

export const geolocationService = new GeolocationService();
