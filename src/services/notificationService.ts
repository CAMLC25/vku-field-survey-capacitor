import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

class NotificationService {
  private isInitialized = false;

  /**
   * Initialize notification channels (critical for Android 8.0+)
   */
  async init() {
    if (this.isInitialized) return;

    if (Capacitor.isNativePlatform()) {
      try {
        await LocalNotifications.createChannel({
          id: 'vku-survey-channel',
          name: 'VKU Field Survey Alerts',
          description: 'Thông báo khảo sát và đồng bộ dữ liệu hiện trường VKU',
          importance: 4, // High importance (heads-up)
          visibility: 1, // Public
          sound: 'beep.wav',
          vibration: true
        });
        this.isInitialized = true;
      } catch (err) {
        console.warn('[NotificationService] Failed to create channel:', err);
      }
    }
  }

  /**
   * Request user permission for notifications
   */
  async requestPermission(): Promise<boolean> {
    try {
      if (Capacitor.isNativePlatform()) {
        const perm = await LocalNotifications.checkPermissions();
        if (perm.display !== 'granted') {
          const req = await LocalNotifications.requestPermissions();
          return req.display === 'granted';
        }
        return true;
      } else if ('Notification' in window) {
        if (Notification.permission === 'default') {
          const status = await Notification.requestPermission();
          return status === 'granted';
        }
        return Notification.permission === 'granted';
      }
    } catch (err) {
      console.warn('[NotificationService] Permission check error:', err);
    }
    return false;
  }

  /**
   * Send a local notification instantly
   */
  async sendNotification(title: string, body: string, extraData?: Record<string, any>) {
    await this.init();

    const notifId = Math.floor(Math.random() * 100000);

    if (Capacitor.isNativePlatform()) {
      try {
        await LocalNotifications.schedule({
          notifications: [
            {
              id: notifId,
              title: `[VKU Survey] ${title}`,
              body: body,
              channelId: 'vku-survey-channel',
              schedule: { at: new Date(Date.now() + 100) },
              extra: extraData,
              smallIcon: 'ic_stat_vku'
            }
          ]
        });
        return;
      } catch (err) {
        console.warn('[NotificationService] LocalNotifications schedule failed:', err);
      }
    }

    // Web fallback
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`[VKU Survey] ${title}`, {
          body: body,
          icon: '/icons/icon-192x192.png'
        });
      } catch (e) {
        console.log(`[Notification Fallback] ${title}: ${body}`);
      }
    }
  }

  /**
   * Quick trigger: Survey recorded offline
   */
  async notifySurveySaved(room: string, building: string) {
    await this.sendNotification(
      'Biên bản đã ghi nhận (Ngoại tuyến)',
      `Phòng ${room} - ${building} đã được lưu an toàn vào cơ sở dữ liệu nội bộ thiết bị.`
    );
  }

  /**
   * Quick trigger: Sync completed
   */
  async notifySyncCompleted(count: number) {
    await this.sendNotification(
      'Đồng bộ hoàn tất',
      `Đã tải thành công ${count} biên bản hiện trường lên máy chủ trung tâm VKU Cloud.`
    );
  }

  /**
   * Quick trigger: Network restored
   */
  async notifyNetworkRestored() {
    await this.sendNotification(
      'Kết nối mạng đã khôi phục',
      'Thiết bị đã kết nối trực tuyến trở lại. Động cơ đồng bộ ngầm đang kích hoạt.'
    );
  }
}

export const notificationService = new NotificationService();
