export const formatDate = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) {
    return 'Just now';
  } else if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else if (days < 7) {
    return `${days}d ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

export class AuthToken {
  private static readonly TOKEN_KEY = 'lumo_auth_token';
  private static readonly REFRESH_TOKEN_KEY = 'lumo_refresh_token';

  static get(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static set(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getRefresh(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static setRefresh(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  static remove(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  static clear(): void {
    this.remove();
  }

  static isValid(): boolean {
    const token = this.get();
    if (!token) return false;
    
    try {
      // Simple JWT validation - check if token has proper structure
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      // Decode payload to check expiration
      const payload = JSON.parse(atob(parts[1]));
      const now = Date.now() / 1000;
      
      return payload.exp && payload.exp > now;
    } catch {
      return false;
    }
  }
}

export class LocalStorage {
  static get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  }

  static getString(key: string): string | null {
    return localStorage.getItem(key);
  }

  static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }

  static has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
