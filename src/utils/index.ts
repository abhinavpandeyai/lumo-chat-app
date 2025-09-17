import { config } from '../config';

export class LocalStorage {
  static get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  static getString(key: string): string | null {
    return this.get(key);
  }

  static set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Handle storage quota exceeded
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      // Handle error
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch {
      // Handle error
    }
  }
}

export class AuthToken {
  static get(): string | null {
    return LocalStorage.get(config.storage.authToken);
  }

  static set(token: string): void {
    LocalStorage.set(config.storage.authToken, token);
    // Set login timestamp when token is stored for auto-login window
    const SessionManager = require('./session').SessionManager;
    SessionManager.setLoginTimestamp();
  }

  static remove(): void {
    LocalStorage.remove(config.storage.authToken);
    const SessionManager = require('./session').SessionManager;
    SessionManager.removeLoginTimestamp();
  }

  static isValid(): boolean {
    const token = this.get();
    if (!token) return false;

    try {
      // Only check JWT expiry - no client-side session timeout
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      
      // Only validate JWT expiry (server-side validation)
      return payload.exp > now;
    } catch {
      return false;
    }
  }

  static canAutoLogin(): boolean {
    // Check if auto-login is allowed (within 15 minutes of last login)
    const SessionManager = require('./session').SessionManager;
    return SessionManager.canAutoLogin();
  }
}

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
