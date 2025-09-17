import { User, LoginFormData, ApiResponse } from '../types';
import { config } from '../config';
import { AuthToken, LocalStorage } from '../utils';

// Mock authentication service for demo purposes
// In a real application, this would make actual API calls
export class AuthService {
  static async login(credentials: LoginFormData): Promise<User> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation (in real app, this would be server-side)
    if (credentials.email === 'sateesh.jain@pcsoft.com' && credentials.password === 'admin123') {
      const user: User = {
        id: '1',
        email: credentials.email,
        name: 'Sateesh Jain',
        role: 'admin',
        avatar: '/images/avatars/sateeshjain.jpeg',
        createdAt: new Date(),
      };

      // Mock JWT token (in real app, this comes from server)
      const mockToken = this.generateMockToken(user);
      AuthToken.set(mockToken);
      LocalStorage.set(config.storage.user, JSON.stringify(user));

      return user;
    } else if (credentials.email === 'harsha.jain@pcsoft.com' && credentials.password === 'user123') {
      const user: User = {
        id: '2',
        email: credentials.email,
        name: 'Harsha Jain',
        role: 'user',
        avatar: '/images/avatars/harshajain.jpeg',
        createdAt: new Date(),
      };

      const mockToken = this.generateMockToken(user);
      AuthToken.set(mockToken);
      LocalStorage.set(config.storage.user, JSON.stringify(user));

      return user;
    } else {
      throw new Error('Invalid credentials');
    }
  }

  static async logout(): Promise<void> {
    AuthToken.remove();
    LocalStorage.remove(config.storage.user);
    LocalStorage.remove(config.storage.chats);
    LocalStorage.remove(config.storage.sessionTimestamp);
  }

  static getCurrentUser(): User | null {
    try {
      const userStr = LocalStorage.get(config.storage.user);
      const hasValidToken = AuthToken.isValid();
      
      // For auto-login check, import SessionManager directly
      const SessionManager = require('../utils/session').SessionManager;
      const canAutoLogin = SessionManager.canAutoLogin();
      
      // Allow user to stay logged in if:
      // 1. They have a valid JWT token, OR
      // 2. They can auto-login (within 15 minutes of last login)
      if (!userStr || typeof userStr !== 'string' || (!hasValidToken && !canAutoLogin)) {
        return null;
      }
      
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  static isAuthenticated(): boolean {
    return AuthToken.isValid() && this.getCurrentUser() !== null;
  }

  private static generateMockToken(user: User): string {
    // Generate a mock JWT token for demo purposes
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour (longer than session timeout)
    }));
    const signature = btoa('mock-signature');
    
    return `${header}.${payload}.${signature}`;
  }
}
