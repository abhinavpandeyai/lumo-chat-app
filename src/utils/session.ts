import { LocalStorage } from './index';
import { config } from '../config';

export class SessionManager {
  private static readonly AUTO_LOGIN_DURATION = 15 * 60 * 1000; // 15 minutes for auto-login after browser close

  static setLoginTimestamp(): void {
    // Set timestamp when user logs in - used for auto-login window
    const timestamp = Date.now().toString();
    LocalStorage.set(config.storage.sessionTimestamp, timestamp);
  }

  static removeLoginTimestamp(): void {
    LocalStorage.remove(config.storage.sessionTimestamp);
  }

  static canAutoLogin(): boolean {
    // Check if user can auto-login within 15 minutes of last login
    const timestampStr = LocalStorage.get(config.storage.sessionTimestamp);
    if (!timestampStr) return false;

    try {
      const loginTimestamp = parseInt(timestampStr, 10);
      const now = Date.now();
      const timeSinceLogin = now - loginTimestamp;
      
      // Allow auto-login within 15 minutes of last login
      return timeSinceLogin < this.AUTO_LOGIN_DURATION;
    } catch {
      return false;
    }
  }

  static updateLastActivity(): void {
    // Update last activity timestamp - this doesn't affect auto-login window
    // This is just for tracking user activity (optional)
    const timestamp = Date.now().toString();
    LocalStorage.set('lumo_last_activity', timestamp);
  }

  static getAutoLoginTimeRemaining(): number {
    const timestampStr = LocalStorage.get(config.storage.sessionTimestamp);
    if (!timestampStr) return 0;

    try {
      const loginTimestamp = parseInt(timestampStr, 10);
      const now = Date.now();
      const timeSinceLogin = now - loginTimestamp;
      const timeRemaining = this.AUTO_LOGIN_DURATION - timeSinceLogin;
      
      return Math.max(0, timeRemaining);
    } catch {
      return 0;
    }
  }

  static getAutoLoginDurationMinutes(): number {
    return this.AUTO_LOGIN_DURATION / (60 * 1000);
  }
}